from django.contrib import admin
from .models import UserAccount

# Register your models here.
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name')

admin.site.register(UserAccount, UserAccountAdmin)