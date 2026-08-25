from django.db import models


class Service(models.Model):
    slug = models.SlugField(unique=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    title = models.CharField(max_length=255)
    price_display = models.CharField(max_length=64, help_text='Например: "3 000 ₽" или "от 30 000 ₽"')
    short_desc = models.TextField()
    long_desc = models.TextField()

    features = models.JSONField(default=list, blank=True, help_text="Список строк")
    cta_label = models.CharField(max_length=255)
    duration = models.CharField(max_length=128, blank=True)
    examples_label = models.CharField(max_length=255, blank=True)

    steps = models.JSONField(default=list, blank=True, help_text='Список объектов [{"title": "...", "text": "..."}]')
    for_whom = models.JSONField(default=list, blank=True, help_text="Список строк")
    what_you_get = models.JSONField(default=list, blank=True, help_text="Список строк")

    cta_dark_label = models.CharField(max_length=255, blank=True)
    cta_dark_heading = models.CharField(max_length=255, blank=True)
    cta_dark_text = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "услуга"
        verbose_name_plural = "услуги"

    def __str__(self):
        return self.title


class Review(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="reviews", null=True, blank=True)
    author = models.CharField(max_length=255, help_text='Например: "Марина, 41 год — капсула онлайн"')
    quote = models.TextField()
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "отзыв"
        verbose_name_plural = "отзывы"

    def __str__(self):
        return f"{self.author}: {self.quote[:40]}"
