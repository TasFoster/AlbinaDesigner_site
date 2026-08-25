from django.contrib import admin

from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "tag", "status", "published_at")
    list_editable = ("status",)
    list_filter = ("status", "tag")
    search_fields = ("title", "excerpt", "body")
    prepopulated_fields = {"slug": ("title",)}
