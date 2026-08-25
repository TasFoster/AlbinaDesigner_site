from django.contrib import admin

from .models import Review, Service


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0
    fields = ("author", "quote", "is_published")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "price_display", "order", "is_active")
    list_editable = ("order", "is_active")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ReviewInline]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("author", "service", "is_published", "created_at")
    list_editable = ("is_published",)
    list_filter = ("is_published", "service")
    search_fields = ("author", "quote")
