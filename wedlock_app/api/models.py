# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

# This contains the models of MongoDB collections
from django.db import models

# Appointments Collection Model with primary key and other attributes as defined in the database
class Appointments(models.Model):
    appointment_id = models.CharField(primary_key=True,max_length=50)
    profile_id = models.CharField(max_length=50)    
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=50)
    number_of_persons = models.IntegerField(max_length=50)
    date = models.CharField(max_length=50)
    time = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'appointments'

#Profiles Collection Model with primary key and other attributes as defined in the database
class Profiles(models.Model):
    profile_id = models.CharField(primary_key=True,max_length=50)
    bride_name = models.CharField(max_length=50)
    groom_name = models.CharField(max_length=50)
    user_name = models.CharField(max_length=50)
    user_type = models.CharField(max_length=50)
    wedding_date = models.CharField(max_length=50)
    wedding_city = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'profiles'

#Packages Collection Model with primary key and other attributes as defined in the database
class Packages(models.Model):
    type = models.CharField(max_length=50)
    cost = models.CharField(max_length=50)
    services = models.CharField(max_length=50)
    package_id = models.CharField(primary_key=True,max_length=50)
    image = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'packages'

#Services Collection Model with primary key and other attributes as defined in the database
class Services(models.Model):
    service_id = models.CharField(primary_key=True,max_length=50)
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    details = models.CharField(max_length=50)
    cost = models.CharField(max_length=50)
    image = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'services'


#Testimonials Collection Model with primary key and other attributes as defined in the database
class Testimonials(models.Model):
    testimonial_id = models.CharField(primary_key=True,max_length=50)
    profile_id = models.CharField(max_length=50)
    date = models.CharField(max_length=50)
    message = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.CharField(max_length=50, blank=True, null=True)    
    bride_groom = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'testimonials'

#Bookings Collection Model with primary key and other attributes as defined in the database
class Bookings(models.Model):
    booking_id = models.CharField(primary_key=True,max_length=50)
    profile_id = models.CharField(max_length=50)
    service_id = models.CharField(max_length=50, blank=True, null=True)
    package_id = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'bookings'
