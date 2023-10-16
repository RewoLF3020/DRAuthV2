from django.urls import path
from .views import RegisterView, RetrieverUserView


urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetrieverUserView.as_view()),
]
