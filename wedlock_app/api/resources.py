# RESTful API need resources, hence Tastypie creates resources classes. 
# These classes are subclass of ModelResource. 
# Class Meta is defined inside the resource to specify : allowed_methods, queryset, resource_name, filtering, ordering, authorization, etc.
# Reference: https://buildmedia.readthedocs.org/media/pdf/django-tastypie/latest/django-tastypie.pdf
from tastypie.resources import ModelResource
from api.models import Profiles, Appointments, Testimonials, Packages, Services, Bookings
import django_filters
from tastypie.authorization import Authorization
from tastypie.resources import ALL, ALL_WITH_RELATIONS
from tastypie.fields import ForeignKey, ToManyField, ToOneField

# AppointmentResource is created with authorization for a POST and GET
class AppointmentResource(ModelResource):
    class Meta:
        allowed_methods = ['get', 'post']
        authorization = Authorization()
        queryset = Appointments.objects.all()
        filtering = {
			'email' : ALL,
			'profile_id' : ALL
        }
        resource_name = 'appointments'

# ProfileResource is created with authorization for a POST and GET
class ProfileResource(ModelResource):
    class Meta:
        allowed_methods = ['get', 'post']
        authorization = Authorization()
        queryset = Profiles.objects.all()
        filtering = {
			'email' : ALL,
            'password' : ALL,
			'profile_id' : ALL
        }
        resource_name = 'profiles'

# TestimonialResource is created with authorization for a POST and GET
class TestimonialResource(ModelResource):
    class Meta:
        allowed_methods = ['get', 'post']
        authorization = Authorization()
        queryset = Testimonials.objects.all()
        filtering = {
			'title' : ALL
        }
        ordering = ['date']
        resource_name = 'testimonials'

# PackageResource is created with authorization for a POST and GET
class PackageResource(ModelResource):
    class Meta:
        allowed_methods = ['get']
        authorization = Authorization()
        queryset = Packages.objects.all()
        filtering = {
			'type' : ALL,
			'package_id' : ALL
        }
        resource_name = 'packages'

# ServiceResource is created with authorization for a POST and GET
class ServiceResource(ModelResource):
    class Meta:
        allowed_methods = ['get']
        authorization = Authorization()
        queryset = Services.objects.all()
        filtering = {
			'category' : ALL,
			'service_id' : ALL
        }
        resource_name = 'services'

# BookingResource is created with authorization for a POST and GET
class BookingResource(ModelResource):
    class Meta:
        allowed_methods = ['get', 'post']
        authorization = Authorization()
        queryset = Bookings.objects.all()
        filtering = {
			'profile_id' : ALL
        }
        resource_name = 'bookings'