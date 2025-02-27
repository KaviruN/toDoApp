from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, unique=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title + '-' + self.user.username
