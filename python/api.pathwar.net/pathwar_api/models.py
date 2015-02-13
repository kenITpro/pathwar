from uuid import uuid4
import json
import random
import md5

import bcrypt
from eve.methods.post import post, post_internal
from flask import abort

from app import app
from utils import request_get_user, default_session


class BaseItem(object):
    def __init__(self):
        pass

    def on_update(self, item):
        pass

    def on_insert(self, item):
        item['_id'] = str(uuid4())

    def on_inserted(self, item):
        pass

    def on_pre_get(self, request, lookup):
        pass

    def on_post_post_item(self, request, response, item):
        pass

    def on_pre_post_item(self, request, item):
        pass

    def on_pre_post(self, request):
        data = request.get_json()
        if isinstance(data, list):
            items = data
        else:
            items = [data]

        for item in items:
            self.on_pre_post_item(request, item)

    def on_post_post(self, request, response):
        dct = json.loads(response.get_data())
        if '_items' in dct:
            items = dct['_items']
        else:
            items = [dct]

        for item in items:
            self.on_post_post_item(request, response, item)


class UserItem(BaseItem):
    resource = 'users'

    def on_update(self, item):
        if 'password' in item and \
           len(item['password']) and \
           not item['password'].startswith('$2a$'):
            # FIXME: better check for bcrypt format
            password = item['password'].encode('utf-8')
            item['password'] = bcrypt.hashpw(
                password, item['password_salt']
            )
        item['gravatar_hash'] = md5.new(
            item['email'].lower().strip()
        ).hexdigest()

    def on_insert(self, item):
        super(UserItem, self).on_insert(item)
        item['password_salt'] = bcrypt.gensalt().encode('utf-8')
        item['email_verification_token'] = str(uuid4())
        # item['otp_secret'] = ...
        self.on_update(item)

    def on_inserted(self, item):
        # FIXME: create a user notification

        # Create an organization in the default session
        default_organization = post_internal('organizations', {
            'name': 'default organization for {}'.format(item['login']),
            'session': default_session()['_id'],
            'owner': item['_id'],
        })

        # Send verification email
        if not app.is_seed and not item['active']:
            # FIXME: put after insert success
            verification_url = url_for(
                'tools.email_verify',
                user_id=item['_id'],
                email_verification_token=item['email_verification_token'],
                _external=True,
            )
            message = 'Verification link: {}'.format(verification_url)
            send_mail(
                message=message,
                subject='Email verification',
                recipients=[item]
            )

    def on_pre_post_item(self, request, item):
        # FIXME: check for a password, users without password are built
        #        internally
        pass

    def on_pre_get(self, request, lookup):
        # Handle users/me
        if 'login' in lookup:
            del lookup['login']
            lookup['_id'] = request_get_user(request)['_id']


class UserTokenItem(BaseItem):
    resource = 'user-tokens'

    def on_pre_post_item(self, request, item):
        # Handle login
        user = request_get_user(request)

        # app.logger.warn('@@@ pre_post_callback: user={}'.format(user))

        if not user:
            abort(401)

        # FIXME: do not accept passing token/user (read-only)

        item['token'] = str(uuid4())
        item['user'] = user['_id']

        # FIXME: add expiry_date


class OrganizationItem(BaseItem):
    resource = 'organizations'

    def on_pre_post_item(self, request, item):
        # FIXME: add a security check to ensure owner is preset by
        #        an internal commands, else drop it

        if not 'owner' in item:
            item['owner'] = request_get_user(request)['_id']

    def on_inserted(self, item):
        post_internal('organization-users', {
            'organization': item['_id'],
            'role': 'owner',
            'user': item['owner'],
        })
        post_internal('organization-statistics', {
            'organization': item['_id'],
        })


# FIXME: add backref to orgs on org-statistics.on_inserted event


# Resource name / class mapping
models = {
    'users': UserItem,
    'user-tokens': UserTokenItem,
    'organizations': OrganizationItem,
}


def resource_get_model(resource):
    """ Returns class matching resource name string. """
    return models.get(resource, BaseItem)
