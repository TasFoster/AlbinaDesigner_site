from django.db import models
from django.utils import timezone


class BlogPost(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Черновик"
        PUBLISHED = "published", "Опубликовано"

    slug = models.SlugField(unique=True)
    tag = models.CharField(max_length=64, help_text='Например: "Мысли", "Лайфхак", "Дневник", "Разбор"')
    title = models.CharField(max_length=255)
    excerpt = models.TextField()
    body = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to="blog/", blank=True, null=True)
    read_minutes = models.PositiveSmallIntegerField(default=3)

    status = models.CharField(max_length=16, choices=Status.choices, default=Status.DRAFT)
    published_at = models.DateTimeField(default=timezone.now)

    # Set when this post was mirrored in from Albina's Telegram channel —
    # lets the bot find-and-update the right post if she edits the original.
    telegram_message_id = models.BigIntegerField(null=True, blank=True, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at"]
        verbose_name = "запись блога"
        verbose_name_plural = "записи блога"

    def __str__(self):
        return self.title
