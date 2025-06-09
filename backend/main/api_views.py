from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import date

from .models import User, Kategori, Transaksi, TipeTransaksi
from .serializers import UserSerializer, KategoriSerializer, TransaksiSerializer
from .views import RingkasanTanggal, PengelolaKategori, PengelolaTransaksi, LayananRingkasan  # assume you put it in utils.py


@api_view(['GET'])
def api_overview(request):
    return Response({
        'status': 'success',
        'message': 'API working correctly!',
        'users': User.objects.count(),
        'categories': Kategori.objects.count(),
        'transactions': Transaksi.objects.count(),
    })


@api_view(['GET'])
def api_user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def api_kategori_list_create(request):
    if request.method == 'GET':
        kategori = Kategori.objects.all()
        serializer = KategoriSerializer(kategori, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = KategoriSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def api_kategori_delete(request, kategori_id):
    try:
        kategori = Kategori.objects.get(pk=kategori_id)
        kategori.delete()
        return Response({'status': 'success', 'message': 'Kategori deleted'})
    except Kategori.DoesNotExist:
        return Response({'status': 'error', 'message': 'Kategori not found'}, status=404)


@api_view(['GET', 'POST'])
def api_transaksi_list_create(request):
    if request.method == 'GET':
        transaksi = Transaksi.objects.all().order_by('-tanggal')
        serializer = TransaksiSerializer(transaksi, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TransaksiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def api_transaksi_delete(request, transaksi_id):
    try:
        transaksi = Transaksi.objects.get(pk=transaksi_id)
        transaksi.delete()
        return Response({'status': 'success', 'message': 'Transaksi deleted'})
    except Transaksi.DoesNotExist:
        return Response({'status': 'error', 'message': 'Transaksi not found'}, status=404)


@api_view(['GET'])
def api_saldo_view(request):
    pemasukan = PengelolaTransaksi.hitungTotalBerdasarkanTipe(TipeTransaksi.PEMASUKAN)
    pengeluaran = PengelolaTransaksi.hitungTotalBerdasarkanTipe(TipeTransaksi.PENGELUARAN)
    saldo = pemasukan - pengeluaran
    return Response({
        'pemasukan_total': pemasukan,
        'pengeluaran_total': pengeluaran,
        'saldo_akhir': saldo
    })


@api_view(['GET'])
def api_summary_view(request):
    today = date.today()
    month = int(request.GET.get('bulan', today.month))
    year = int(request.GET.get('tahun', today.year))
    
    pemasukan = LayananRingkasan.hitungPemasukanBerdasarkanBulan(month, year)
    pengeluaran = LayananRingkasan.hitungPengeluaranBerdasarkanBulan(month, year)
    transaksi = Transaksi.objects.filter(tanggal__month=month, tanggal__year=year)
    serializer = TransaksiSerializer(transaksi, many=True)

    return Response({
        'bulan': month,
        'tahun': year,
        'pemasukan': pemasukan,
        'pengeluaran': pengeluaran,
        'net_balance': pemasukan - pengeluaran,
        'transactions': serializer.data
    })

@api_view(['GET'])
def api_today_total(request):
    today = date.today()
    today_summary = RingkasanTanggal(today)
    return Response({
        'today': str(today),
        'summary': today_summary.generate_ringkasan()  
    })
