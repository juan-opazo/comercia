# # import dj_database_url
# import os
# from configurations import Configuration
# from distutils.util import strtobool
# from os.path import join


# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# class Common(Configuration):
#     INSTALLED_APPS = (
#         'django.contrib.admin',
#         'django.contrib.auth',
#         'django.contrib.contenttypes',
#         'django.contrib.sessions',
#         'django.contrib.messages',
#         'django.contrib.staticfiles',
#         # Third party apps.
#         'rest_framework',
#         'rest_framework.authtoken', # Token authentication.
#         'django_filters', # For filtering rest endpoints.
#         'corsheaders', # For allow/disallow external api calls.

#         # Your apps
#         'comercia.products',
#     )

#     # https://docs.djangoproject.com/en/2.0/topics/http/middleware/
#     MIDDLEWARE = (
#         'django.middleware.security.SecurityMiddleware',
#         'django.contrib.sessions.middleware.SessionMiddleware',
#         'corsheaders.middleware.CorsMiddleware',
#         'django.middleware.common.CommonMiddleware',
#         'django.middleware.csrf.CsrfViewMiddleware',
#         'django.contrib.auth.middleware.AuthenticationMiddleware',
#         'django.contrib.messages.middleware.MessageMiddleware',
#         'django.middleware.clickjacking.XFrameOptionsMiddleware',
#         'django.middleware.locale.LocaleMiddleware'
#     )


#     ALLOWED_HOSTS = ["*"]
#     ROOT_URLCONF = 'server.urls'
#     SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')
#     APP_SECRET_KEY = os.getenv('APP_SECRET_KEY')
#     CONTACT_SECRET_KEY = os.getenv('CONTACT_SECRET_KEY')
#     WSGI_APPLICATION = 'server.wsgi.application'

#     # Email
#     EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
#     DEFAULT_FROM_EMAIL = 'Comercia  <mcorbera@pucp.edu.pe>'

#     ADMINS = (
#         ('Author', 'mcorbera@pucp.edu.pe'),
#     )

#     # Postgres
#     # DATABASES = {
#     #     'default': dj_database_url.config(
#     #         default=os.getenv('DATABASE_URL'),
#     #         conn_max_age=int(os.getenv('POSTGRES_CONN_MAX_AGE', 600))
#     #     )
#     # }

#     # Redis
#     CACHES = {
#         "default": {
#             "BACKEND": "django_redis.cache.RedisCache",
#             "LOCATION": os.getenv('REDIS_URL'),
#             "OPTIONS": {
#                 "CLIENT_CLASS": "django_redis.client.DefaultClient"
#             }
#         }
#     }

#     # General
#     APPEND_SLASH = False
#     TIME_ZONE = 'UTC'

#     # If you set this to False, Django will make some optimizations so as not
#     # to load the internationalization machinery.
#     USE_I18N = False
#     USE_L10N = True
#     USE_TZ = True
#     LOGIN_REDIRECT_URL = '/'

#     # Static files (CSS, JavaScript, Images)
#     # https://docs.djangoproject.com/en/2.0/howto/static-files/
#     STATIC_ROOT = os.path.normpath(join(os.path.dirname(BASE_DIR), 'static'))
#     STATICFILES_DIRS = []
#     STATIC_URL = '/static/'
#     STATICFILES_FINDERS = (
#         'django.contrib.staticfiles.finders.FileSystemFinder',
#         'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#     )

#     # Media files
#     MEDIA_ROOT = join(os.path.dirname(BASE_DIR), 'media')
#     MEDIA_URL = '/media/'

#     # QR code files
#     QR_CODE_FOLDER = os.path.join('qr_codes/','qr_codes_images')

#     TEMPLATES = [
#         {
#             'BACKEND': 'django.template.backends.django.DjangoTemplates',
#             'DIRS': [
#                 'templates/'
#                 ],
#             'APP_DIRS': True,
#             'OPTIONS': {
#                 'context_processors': [
#                     'django.template.context_processors.debug',
#                     'django.template.context_processors.request',
#                     'django.contrib.auth.context_processors.auth',
#                     'django.contrib.messages.context_processors.messages',
#                 ],
#             },
#         },
#     ]

#     # Set DEBUG to False as a default for safety
#     # https://docs.djangoproject.com/en/dev/ref/settings/#debug
#     DEBUG = strtobool(os.getenv('DJANGO_DEBUG', 'no'))

#     # Password Validation
#     # https://docs.djangoproject.com/en/2.0/topics/auth/passwords/#module-django.contrib.auth.password_validation
#     AUTH_PASSWORD_VALIDATORS = [
#         {
#             'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#         },
#         {
#             'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#         },
#         {
#             'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#         },
#         {
#             'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#         },
#     ]

#     # Logging
#     LOGGING = {
#         'version': 1,
#         'disable_existing_loggers': False,
#         'formatters': {
#             'django.server': {
#                 '()': 'django.utils.log.ServerFormatter',
#                 'format': '[%(server_time)s] %(message)s',
#             },
#             'verbose': {
#                 'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
#             },
#             'simple': {
#                 'format': '%(levelname)s %(message)s'
#             },
#         },
#         'filters': {
#             'require_debug_true': {
#                 '()': 'django.utils.log.RequireDebugTrue',
#             },
#         },
#         'handlers': {
#             'django.server': {
#                 'level': 'INFO',
#                 'class': 'logging.StreamHandler',
#                 'formatter': 'django.server',
#             },
#             'console': {
#                 'level': 'DEBUG',
#                 'class': 'logging.StreamHandler',
#                 'formatter': 'simple'
#             },
#             'mail_admins': {
#                 'level': 'ERROR',
#                 'class': 'django.utils.log.AdminEmailHandler'
#             }
#         },
#         'loggers': {
#             'django': {
#                 'handlers': ['console'],
#                 'propagate': True,
#             },
#             'django.server': {
#                 'handlers': ['django.server'],
#                 'level': 'INFO',
#                 'propagate': False,
#             },
#             'django.request': {
#                 'handlers': ['mail_admins', 'console'],
#                 'level': 'ERROR',
#                 'propagate': False,
#             },
#             'django.db.backends': {
#                 'handlers': ['console'],
#                 'level': 'INFO'
#             },
#         }
#     }

#     # Custom user app
#     # TODO: Resolve user model
#     # AUTH_USER_MODEL = 'users.User'

#     # CELERY
#     if USE_TZ:
#         CELERY_TIMEZONE = TIME_ZONE
#     CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL')
#     CELERY_RESULT_BACKEND = CELERY_BROKER_URL
#     CELERY_ACCEPT_CONTENT = ['json']
#     CELERY_TASK_SERIALIZER = 'json'
#     CELERY_RESULT_SERIALIZER = 'json'
#     CELERYD_TASK_TIME_LIMIT = 5 * 60
#     CELERYD_TASK_SOFT_TIME_LIMIT = 60
#     CELERY_ALWAYS_EAGER = False

#     # Django Rest Framework
#     REST_FRAMEWORK = {
#         'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
#         'PAGE_SIZE': int(os.getenv('DJANGO_PAGINATION_LIMIT', 10)),
#         'DATETIME_FORMAT': '%Y-%m-%dT%H:%M:%S%z',
#         'DEFAULT_RENDERER_CLASSES': (
#             'rest_framework.renderers.JSONRenderer',
#             'rest_framework.renderers.BrowsableAPIRenderer',
#         ),
#         'DEFAULT_PERMISSION_CLASSES': [
#             'rest_framework.permissions.IsAuthenticated',
#         ],
#         'DEFAULT_AUTHENTICATION_CLASSES': (
#             'rest_framework.authentication.TokenAuthentication',
#             'rest_framework.authentication.SessionAuthentication',
#         ),
#         'EXCEPTION_HANDLER': 'comercia.utils.exceptions.custom_exception_handler'
#     }
