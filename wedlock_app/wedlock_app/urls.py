"""wedlock_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# Reference: https://buildmedia.readthedocs.org/media/pdf/django-tastypie/latest/django-tastypie.pdf
# Hooks up to the resources. Accepts the requests and connects it back to the resources. 

#URLPatterns craeted for resources like appointments, profiles, testimonials, packages, services, and bookings

from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from api.resources import AppointmentResource, ProfileResource, TestimonialResource, PackageResource, ServiceResource, BookingResource
appointments_resource = AppointmentResource()
profiles_resource = ProfileResource()
testimonial_resource = TestimonialResource()
package_resource = PackageResource()
service_resource = ServiceResource()
booking_resource = BookingResource()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
	url(r'^api/', include(appointments_resource.urls)),
	url(r'^api/', include(profiles_resource.urls)),
	url(r'^api/', include(testimonial_resource.urls)),
	url(r'^api/', include(package_resource.urls)),
	url(r'^api/', include(service_resource.urls)),
	url(r'^api/', include(booking_resource.urls)),
]