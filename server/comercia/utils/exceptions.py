# Django
from django.conf import settings
from django.core.exceptions import PermissionDenied

#Django rest
from rest_framework.exceptions import ValidationError, NotAuthenticated
from rest_framework.views import exception_handler
from rest_framework import status

from django.utils.translation import gettext_lazy as _


class CustomAPIException(ValidationError):
    """
    Custom Validation for API Errors. Sets error code
    in validationError identifier 'code' and the detail
    message
    """
    status_code = status.HTTP_400_BAD_REQUEST
    default_code = 'unknown'
    default_detail = _('Ha sucedido un error desconocido.')

    def __init__(self, code, *format_insert, status_code=None,):
        """
        If you want to pass a status_code, you must explicity
        pass it as "status_code=<status code>"
        """
        if status_code is not None:
            self.status_code = status_code

        code = str(code)
        try:
            detail = settings.API_ERROR_CODES[code].format(*format_insert)
        except KeyError:
            code = None
            detail = None

        super().__init__(code=code, detail=detail)


def custom_exception_handler(exc, context):
    """
    This function intercepts all exceptions of the system.
    Transform the default response of django rest to a
    custom response.

    Default Django rest Response:
    {
      'field1': [
          {
              'subfield1': [
                  ErrorDetail('error message1', 'code1')
                  ...
               ],
           }
           ...
      ]
      'field2': [
          ErrorDetail('error message2', 'code2'),
          ErrorDetail('error message3', 'code3')
          ...
       ],
      'non_fields_errors': { // this also could be a dict
        ...
      }
    }

    Custom error response:

    {
      errors: [
        {
          'code': 'code1',
          'field': 'field1_subfield1',
          'message': 'error message1'
        },
        {
          'code': 'code2',
          'field': 'field2',
          'message': 'error message2'
        },
        {
          'code': 'code3',
          'field': 'field2',
          'message': 'error message3'
        },
        ...
      ]
    }
    """

    # handle the exception as usual
    response = exception_handler(exc, context)

    # if response is None, do nothing
    if response is None:
        return response

    # build own errors
    errors = []

    # if it is a ValidationError, reformat
    if isinstance(exc, ValidationError):
        set_field_errors(errors, response.data)
        response.data = { 'errors': errors }

    # if it is a PermissionDenied, reformat
    if isinstance(exc, PermissionDenied) or isinstance(exc, NotAuthenticated):
        errors.append({
            'code': 'permission_denied',
            'message': response.data['detail'],
            'field': 'no_field'
        })
        response.data = { 'errors': errors }

    return response


def format_errors_for_response(serializer_errors):
    errors = []
    set_field_errors(errors, serializer_errors)
    return errors


def set_field_errors(errors, value, parent_field_name=None):
    if isinstance(value, list):
        for val in value:
            set_field_errors(errors, val, parent_field_name)
        return

    if isinstance(value, dict):
        for field, field_values in value.items():
            if parent_field_name == None:
                field_name = field
            else:
                field_name = '{}_{}'.format(parent_field_name, field)
            set_field_errors(
                errors,
                field_values,
                field_name
            )
        return

    errors.append({
        'code': value.code,
        'message': str(value),
        'field': parent_field_name
    })
