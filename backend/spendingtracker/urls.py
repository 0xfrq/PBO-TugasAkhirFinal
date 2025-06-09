from django.contrib import admin
from django.urls import path, include
from main import views as main_views
from main import api_views

urlpatterns = [
    # Web views
    path('', main_views.show_main, name='show_main'),
    path('kategori/', main_views.kategori_list, name='kategori_list'),
    path('kategori/create/', main_views.kategori_create, name='kategori_create'),
    path('kategori/delete/<str:kategori_id>/', main_views.kategori_delete, name='kategori_delete'),
    path('transaksi/', main_views.transaksi_list, name='transaksi_list'),
    path('transaksi/create/', main_views.transaksi_create, name='transaksi_create'),
    path('transaksi/delete/<str:transaksi_id>/', main_views.transaksi_delete, name='transaksi_delete'),
    path('summary/', main_views.summary_view, name='summary'),
    path('api/test/', main_views.api_test, name='api_test'),
    path('saldo/', main_views.saldo_view, name='saldo'),

    path('api/', api_views.api_overview),
    path('api/users/', api_views.api_user_list),
    path('api/kategori/', api_views.api_kategori_list_create),
    path('api/kategori/<str:kategori_id>/', api_views.api_kategori_delete),
    path('api/transaksi/', api_views.api_transaksi_list_create),
    path('api/transaksi/<str:transaksi_id>/', api_views.api_transaksi_delete),
    path('api/saldo/', api_views.api_saldo_view),
    path('api/summary/', api_views.api_summary_view),
    path('api/today-total/', api_views.api_today_total),
]
