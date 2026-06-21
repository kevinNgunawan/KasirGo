/* KasirGO v5.0 - Full Feature Update */
const LS={get:(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch{return d;}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}}};
const TRIAL_DAYS=30,SUPER_ADMIN_USERNAME='superadmin',SUPER_ADMIN_PASSWORD='kasirgo2024!';
let accounts=LS.get('kg_accounts',[{username:'admin',password:'admin123',namaUsaha:'KasirGO Store',logo:'',alamat:'Jl. Sudirman No. 123, Jakarta',telp:'021-12345678',role:'admin',trial_start_date:new Date().toISOString().split('T')[0],subscription_status:'trial',expiry_date:(()=>{const d=new Date();d.setDate(d.getDate()+30);return d.toISOString().split('T')[0];})()}]);
let currentUser=LS.get('kg_currentUser',null);
let settings=LS.get('kg_settings',{namaUsaha:'KasirGO Store',logo:'',alamat:'Jl. Sudirman No. 123, Jakarta',telp:'021-12345678',ppn:11,ppnAktif:true,header:'Terima kasih telah berbelanja!',footer:'Barang yang sudah dibeli tidak dapat dikembalikan.'});
let kategori=LS.get('kg_kategori',[{id:1,nama:'Minuman',icon:'fa-solid fa-mug-hot'},{id:2,nama:'Makanan',icon:'fa-solid fa-burger'},{id:3,nama:'Snack',icon:'fa-solid fa-cookie'},{id:4,nama:'Sembako',icon:'fa-solid fa-wheat-awn'},{id:5,nama:'Kebersihan',icon:'fa-solid fa-soap'}]);
let produk=LS.get('kg_produk',[{id:1,barcode:'8991234000001',nama:'Kopi Susu Sachet',kategori_id:1,satuan:'pcs',harga_beli:4000,harga_jual:7000,stok:50,gambar:''},{id:2,barcode:'8991234000002',nama:'Teh Botol Sosro',kategori_id:1,satuan:'pcs',harga_beli:4500,harga_jual:8000,stok:3,gambar:''},{id:3,barcode:'8991234000003',nama:'Air Mineral 600ml',kategori_id:1,satuan:'pcs',harga_beli:2500,harga_jual:4000,stok:80,gambar:''},{id:4,barcode:'8991234000004',nama:'Nasi Goreng Spesial',kategori_id:2,satuan:'pcs',harga_beli:8000,harga_jual:15000,stok:20,gambar:''},{id:5,barcode:'8991234000005',nama:'Mie Ayam Bakso',kategori_id:2,satuan:'pcs',harga_beli:7000,harga_jual:13000,stok:4,gambar:''},{id:6,barcode:'8991234000006',nama:'Risoles Mayo',kategori_id:2,satuan:'pcs',harga_beli:3000,harga_jual:6000,stok:15,gambar:''},{id:7,barcode:'8991234000007',nama:'Chitato Sapi Panggang',kategori_id:3,satuan:'pcs',harga_beli:8000,harga_jual:14000,stok:2,gambar:''},{id:8,barcode:'8991234000008',nama:'Oreo Biskuit',kategori_id:3,satuan:'pcs',harga_beli:5000,harga_jual:9000,stok:25,gambar:''},{id:9,barcode:'8991234000009',nama:'Beras 5kg',kategori_id:4,satuan:'kg',harga_beli:62000,harga_jual:75000,stok:10,gambar:''},{id:10,barcode:'8991234000010',nama:'Minyak Goreng 1L',kategori_id:4,satuan:'liter',harga_beli:14000,harga_jual:18000,stok:8,gambar:''},{id:11,barcode:'8991234000011',nama:'Sabun Mandi Lifebuoy',kategori_id:5,satuan:'pcs',harga_beli:5500,harga_jual:9000,stok:30,gambar:''},{id:12,barcode:'8991234000012',nama:'Shampo Sunsilk',kategori_id:5,satuan:'pcs',harga_beli:9000,harga_jual:15000,stok:1,gambar:''}]);
let transaksi=LS.get('kg_transaksi',[{id:1,invoice:'INV-0001',tanggal:'2026-03-19',waktu:'08:30',pelanggan:'Umum',items:[{produk_id:1,qty:3},{produk_id:3,qty:2}],snapItems:[{produk_id:1,nama:'Kopi Susu Sachet',harga:7000,qty:3,subtotal:21000},{produk_id:3,nama:'Air Mineral 600ml',harga:4000,qty:2,subtotal:8000}],subtotal:29000,diskon:0,afterDiskon:29000,ppn:3190,total:32190,bayar:35000,kembali:2810,metode:'tunai',kasir:'admin'},{id:2,invoice:'INV-0002',tanggal:'2026-03-19',waktu:'09:15',pelanggan:'Umum',items:[{produk_id:4,qty:2},{produk_id:6,qty:3}],snapItems:[{produk_id:4,nama:'Nasi Goreng Spesial',harga:15000,qty:2,subtotal:30000},{produk_id:6,nama:'Risoles Mayo',harga:6000,qty:3,subtotal:18000}],subtotal:48000,diskon:0,afterDiskon:48000,ppn:5280,total:53280,bayar:53280,kembali:0,metode:'qris',kasir:'admin'},{id:3,invoice:'INV-0003',tanggal:'2026-03-20',waktu:'10:45',pelanggan:'Budi',items:[{produk_id:9,qty:1},{produk_id:10,qty:2}],snapItems:[{produk_id:9,nama:'Beras 5kg',harga:75000,qty:1,subtotal:75000},{produk_id:10,nama:'Minyak Goreng 1L',harga:18000,qty:2,subtotal:36000}],subtotal:111000,diskon:5,afterDiskon:105450,ppn:11600,total:117050,bayar:120000,kembali:2950,metode:'tunai',kasir:'admin'},{id:4,invoice:'INV-0004',tanggal:'2026-03-20',waktu:'11:20',pelanggan:'Umum',items:[{produk_id:2,qty:4},{produk_id:8,qty:2}],snapItems:[{produk_id:2,nama:'Teh Botol Sosro',harga:8000,qty:4,subtotal:32000},{produk_id:8,nama:'Oreo Biskuit',harga:9000,qty:2,subtotal:18000}],subtotal:50000,diskon:0,afterDiskon:50000,ppn:5500,total:55500,bayar:55500,kembali:0,metode:'debit',kasir:'admin'},{id:5,invoice:'INV-0005',tanggal:'2026-03-21',waktu:'13:00',pelanggan:'Sari',items:[{produk_id:11,qty:3},{produk_id:3,qty:5}],snapItems:[{produk_id:11,nama:'Sabun Mandi Lifebuoy',harga:9000,qty:3,subtotal:27000},{produk_id:3,nama:'Air Mineral 600ml',harga:4000,qty:5,subtotal:20000}],subtotal:47000,diskon:0,afterDiskon:47000,ppn:5170,total:52170,bayar:52170,kembali:0,metode:'qris',kasir:'admin'},{id:6,invoice:'INV-0006',tanggal:'2026-03-21',waktu:'14:30',pelanggan:'Umum',items:[{produk_id:1,qty:5},{produk_id:7,qty:2}],snapItems:[{produk_id:1,nama:'Kopi Susu Sachet',harga:7000,qty:5,subtotal:35000},{produk_id:7,nama:'Chitato Sapi Panggang',harga:14000,qty:2,subtotal:28000}],subtotal:63000,diskon:10,afterDiskon:56700,ppn:6237,total:62937,bayar:65000,kembali:2063,metode:'tunai',kasir:'admin'},{id:7,invoice:'INV-0007',tanggal:'2026-03-22',waktu:'12:00',pelanggan:'Rudi',items:[{produk_id:4,qty:1},{produk_id:5,qty:1}],snapItems:[{produk_id:4,nama:'Nasi Goreng Spesial',harga:15000,qty:1,subtotal:15000},{produk_id:5,nama:'Mie Ayam Bakso',harga:13000,qty:1,subtotal:13000}],subtotal:28000,diskon:0,afterDiskon:28000,ppn:3080,total:31080,bayar:35000,kembali:3920,metode:'tunai',kasir:'admin'},{id:8,invoice:'INV-0008',tanggal:'2026-03-22',waktu:'15:45',pelanggan:'Umum',items:[{produk_id:6,qty:4},{produk_id:8,qty:3}],snapItems:[{produk_id:6,nama:'Risoles Mayo',harga:6000,qty:4,subtotal:24000},{produk_id:8,nama:'Oreo Biskuit',harga:9000,qty:3,subtotal:27000}],subtotal:51000,diskon:0,afterDiskon:51000,ppn:5610,total:56610,bayar:56610,kembali:0,metode:'debit',kasir:'admin'},{id:9,invoice:'INV-0009',tanggal:'2026-03-23',waktu:'09:00',pelanggan:'Ani',items:[{produk_id:9,qty:2},{produk_id:11,qty:2}],snapItems:[{produk_id:9,nama:'Beras 5kg',harga:75000,qty:2,subtotal:150000},{produk_id:11,nama:'Sabun Mandi Lifebuoy',harga:9000,qty:2,subtotal:18000}],subtotal:168000,diskon:0,afterDiskon:168000,ppn:18480,total:186480,bayar:200000,kembali:13520,metode:'tunai',kasir:'admin'},{id:10,invoice:'INV-0010',tanggal:'2026-03-23',waktu:'16:20',pelanggan:'Umum',items:[{produk_id:3,qty:10},{produk_id:2,qty:5}],snapItems:[{produk_id:3,nama:'Air Mineral 600ml',harga:4000,qty:10,subtotal:40000},{produk_id:2,nama:'Teh Botol Sosro',harga:8000,qty:5,subtotal:40000}],subtotal:80000,diskon:5,afterDiskon:76000,ppn:8360,total:84360,bayar:84360,kembali:0,metode:'qris',kasir:'admin'},{id:11,invoice:'INV-0011',tanggal:'2026-03-24',waktu:'10:10',pelanggan:'Deni',items:[{produk_id:1,qty:6},{produk_id:7,qty:1}],snapItems:[{produk_id:1,nama:'Kopi Susu Sachet',harga:7000,qty:6,subtotal:42000},{produk_id:7,nama:'Chitato Sapi Panggang',harga:14000,qty:1,subtotal:14000}],subtotal:56000,diskon:0,afterDiskon:56000,ppn:6160,total:62160,bayar:65000,kembali:2840,metode:'tunai',kasir:'admin'},{id:12,invoice:'INV-0012',tanggal:'2026-03-24',waktu:'11:55',pelanggan:'Umum',items:[{produk_id:10,qty:3},{produk_id:6,qty:2}],snapItems:[{produk_id:10,nama:'Minyak Goreng 1L',harga:18000,qty:3,subtotal:54000},{produk_id:6,nama:'Risoles Mayo',harga:6000,qty:2,subtotal:12000}],subtotal:66000,diskon:0,afterDiskon:66000,ppn:7260,total:73260,bayar:75000,kembali:1740,metode:'tunai',kasir:'admin'},{id:13,invoice:'INV-0013',tanggal:'2026-03-25',waktu:'14:00',pelanggan:'Rina',items:[{produk_id:12,qty:2},{produk_id:8,qty:4}],snapItems:[{produk_id:12,nama:'Shampo Sunsilk',harga:15000,qty:2,subtotal:30000},{produk_id:8,nama:'Oreo Biskuit',harga:9000,qty:4,subtotal:36000}],subtotal:66000,diskon:5,afterDiskon:62700,ppn:6897,total:69597,bayar:69597,kembali:0,metode:'debit',kasir:'admin'},{id:14,invoice:'INV-0014',tanggal:'2026-03-25',waktu:'17:30',pelanggan:'Umum',items:[{produk_id:5,qty:3},{produk_id:3,qty:8}],snapItems:[{produk_id:5,nama:'Mie Ayam Bakso',harga:13000,qty:3,subtotal:39000},{produk_id:3,nama:'Air Mineral 600ml',harga:4000,qty:8,subtotal:32000}],subtotal:71000,diskon:0,afterDiskon:71000,ppn:7810,total:78810,bayar:80000,kembali:1190,metode:'tunai',kasir:'admin'},{id:15,invoice:'INV-0015',tanggal:'2026-03-26',waktu:'08:45',pelanggan:'Hendra',items:[{produk_id:1,qty:4},{produk_id:11,qty:2}],snapItems:[{produk_id:1,nama:'Kopi Susu Sachet',harga:7000,qty:4,subtotal:28000},{produk_id:11,nama:'Sabun Mandi Lifebuoy',harga:9000,qty:2,subtotal:18000}],subtotal:46000,diskon:0,afterDiskon:46000,ppn:5060,total:51060,bayar:51060,kembali:0,metode:'qris',kasir:'admin'}]);
let hutangPiutang=LS.get('kg_hutang',[{id:1,jenis:'hutang',nama:'Budi Santoso',telp:'081234567890',jumlah:150000,tglCatat:'2026-04-01',jatuhTempo:'2026-04-21',status:'aktif',keterangan:'Beli beras + minyak',sisa:150000},{id:2,jenis:'piutang',nama:'Toko Maju Jaya',telp:'082345678901',jumlah:500000,tglCatat:'2026-04-05',jatuhTempo:'2026-04-25',status:'aktif',keterangan:'Hutang ke supplier sayur',sisa:500000},{id:3,jenis:'hutang',nama:'Sari Dewi',telp:'083456789012',jumlah:75000,tglCatat:'2026-04-10',jatuhTempo:'2026-04-20',status:'aktif',keterangan:'Belanja minuman & snack',sisa:75000},{id:4,jenis:'hutang',nama:'Rudi Hartono',telp:'',jumlah:200000,tglCatat:'2026-03-20',jatuhTempo:'2026-04-05',status:'lunas',keterangan:'Sembako bulanan',sisa:0}]);
let cart=[],payMethod='tunai',editProdukId=null,editKategoriId=null,editHutangId=null,hutangFilter='semua',dtProduk=null,dtLaporan=null,lastStruk=null,shiftStartTime=LS.get('kg_shiftStart',null),laporanPeriode='harian',_realTimeTimer=null,_lastGeneratedCode='';

// ── PERSIST ──
function saveData(){LS.set('kg_kategori',kategori);LS.set('kg_produk',produk);LS.set('kg_transaksi',transaksi);LS.set('kg_settings',settings);LS.set('kg_hutang',hutangPiutang);_updateNavBadges();}

// ── HELPERS ──
function formatRp(n){return 'Rp '+(Math.round(n)||0).toLocaleString('id-ID');}
function formatRpNoSym(n){return (Math.round(n)||0).toLocaleString('id-ID');}
function formatTanggal(s){if(!s)return'—';return new Date(s+'T00:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});}
function getCatName(id){const k=kategori.find(x=>x.id===id);return k?k.nama:'-';}
function getProdukEmoji(k){return({1:'☕',2:'🍜',3:'🍪',4:'🌾',5:'🧼'})[k]||'📦';}
function genBarcode(){return'899'+Math.floor(Math.random()*1e10).toString().padStart(10,'0');}

// ── SUBSCRIPTION ──
function getAccountSubscription(username){
  const acc=accounts.find(a=>a.username===username);if(!acc)return null;
  const today=new Date().toISOString().split('T')[0];
  const expiry=acc.expiry_date;
  const daysLeft=expiry?Math.ceil((new Date(expiry)-new Date(today))/86400000):-1;
  return{acc,today,expiry,daysLeft,isExpired:daysLeft<0,status:acc.subscription_status||'trial'};
}
function isSystemLocked(){
  if(!currentUser)return false;
  if(currentUser.username===SUPER_ADMIN_USERNAME)return false;
  const s=getAccountSubscription(currentUser.username);
  return s?s.isExpired:false;
}
function getUserRole(){
  if(!currentUser)return null;
  if(currentUser.username===SUPER_ADMIN_USERNAME)return'superadmin';
  const acc=accounts.find(a=>a.username===currentUser.username);
  return acc?(acc.role||'kasir'):'kasir';
}
function isSuperAdmin(){return currentUser&&currentUser.username===SUPER_ADMIN_USERNAME;}

function checkAndShowGraceBanner(){
  const b=document.getElementById('graceBanner');if(!b)return;
  if(!currentUser||isSuperAdmin()||getUserRole()==='kasir'){b.style.display='none';return;}
  const sub=getAccountSubscription(currentUser.username);
  if(!sub||sub.isExpired){b.style.display='none';return;}
  if(sub.daysLeft<=7){
    b.innerHTML=`<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <i class="fa-solid fa-triangle-exclamation" style="font-size:20px;color:#f59e0b;flex-shrink:0"></i>
      <div style="flex:1;min-width:200px;font-size:13px"><strong>⏰ Masa aktif KasirGO Anda tersisa ${sub.daysLeft} hari lagi.</strong> Segera lakukan perpanjangan agar operasional kasir tidak terhenti. Hubungi Admin untuk Kode Referensi baru.</div>
      <button class="btn btn-warning btn-sm fw-bold" onclick="showPage('langganan',null)" style="white-space:nowrap;font-size:12px"><i class="fa-solid fa-key me-1"></i>Input Kode Lisensi</button>
      <button onclick="document.getElementById('graceBanner').style.display='none'" style="background:none;border:none;color:inherit;opacity:.6;cursor:pointer;font-size:18px;line-height:1;padding:0">✕</button>
    </div>`;
    b.style.display='';
  }else{b.style.display='none';}
}

function showLockedScreen(){
  if(getUserRole()==='kasir'){
    document.getElementById('appWrapper').style.display='none';
    const lk=document.getElementById('kasirLockScreen');if(lk)lk.style.display='flex';
  }else{showPage('langganan',null);}
}

function generateLicenseCode(days){
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code='';for(let i=0;i<16;i++){if(i>0&&i%4===0)code+='-';code+=chars[Math.floor(Math.random()*chars.length)];}
  const all=LS.get('kg_license_codes',[]);
  all.push({code,days,created_at:new Date().toISOString().split('T')[0],used:false});
  LS.set('kg_license_codes',all);return code;
}

function activateLicense(code){
  if(!code||!code.trim()){showToast('Masukkan kode lisensi!','warning');return;}
  const all=LS.get('kg_license_codes',[]);
  const lic=all.find(c=>c.code===code.trim().toUpperCase()&&!c.used);
  if(!lic){showToast('Kode tidak valid atau sudah digunakan!','error');return;}
  const acc=accounts.find(a=>a.username===currentUser.username);if(!acc)return;
  const today=new Date().toISOString().split('T')[0];
  const base=(acc.expiry_date&&acc.expiry_date>=today)?acc.expiry_date:today;
  const nd=new Date(base);nd.setDate(nd.getDate()+lic.days);
  acc.subscription_status='active';acc.expiry_date=nd.toISOString().split('T')[0];
  const idx=all.findIndex(c=>c.code===lic.code);
  if(idx!==-1){all[idx].used=true;all[idx].used_by=currentUser.username;all[idx].used_at=today;}
  LS.set('kg_license_codes',all);LS.set('kg_accounts',accounts);
  showToast(`✅ Lisensi aktif! Berlaku hingga ${formatTanggal(acc.expiry_date)}`,'success');
  const inp=document.getElementById('licenseCodeInput');if(inp)inp.value='';
  const lk=document.getElementById('kasirLockScreen');if(lk)lk.style.display='none';
  document.getElementById('appWrapper').style.display='';
  applyRoleBasedUI();checkAndShowGraceBanner();renderLanggananPage();
}

// ── AUTH ──
let _selectedLoginRole = 'admin'; // default

function setLoginRole(role, el) {
  _selectedLoginRole = role;
  // Update tab styles
  document.querySelectorAll('.login-role-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');

  const badgeEl  = document.getElementById('loginRoleBadgeText');
  const loginBtn = document.getElementById('loginBtn');
  const titleEl  = document.getElementById('loginTitle');

  if (role === 'admin') {
    if (badgeEl)  { badgeEl.innerHTML  = '<i class="fa-solid fa-crown"></i> Masuk sebagai Admin'; badgeEl.style.cssText='display:inline-flex;align-items:center;gap:6px;background:rgba(74,144,226,.1);color:#4a90e2;border-radius:20px;padding:4px 14px;font-size:12px;font-weight:700'; }
    if (loginBtn) { loginBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket me-2"></i>Masuk sebagai Admin'; loginBtn.style.background=''; }
    if (titleEl)  titleEl.textContent  = 'Masuk sebagai Admin';
    // Show register link for admin
    const regLink = document.querySelector('.auth-switch');
    if (regLink) regLink.style.display = '';
  } else {
    if (badgeEl)  { badgeEl.innerHTML  = '<i class="fa-solid fa-cash-register"></i> Masuk sebagai Kasir'; badgeEl.style.cssText='display:inline-flex;align-items:center;gap:6px;background:rgba(40,199,111,.1);color:#28c76f;border-radius:20px;padding:4px 14px;font-size:12px;font-weight:700'; }
    if (loginBtn) { loginBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket me-2"></i>Masuk sebagai Kasir'; loginBtn.style.background='linear-gradient(135deg,#28c76f,#20a760)'; }
    if (titleEl)  titleEl.textContent  = 'Masuk sebagai Kasir';
    // Hide register link for kasir (kasir dibuat oleh admin)
    const regLink = document.querySelector('.auth-switch');
    if (regLink) regLink.style.display = 'none';
  }
}

function switchAuth(p){document.getElementById('panelLogin').style.display=p==='login'?'':'none';document.getElementById('panelDaftar').style.display=p==='daftar'?'':'none';}

function doLogin(){
  const u=document.getElementById('loginUsername').value.trim();
  const p=document.getElementById('loginPassword').value;
  if(!u||!p){showToast('Isi username dan password!','warning');return;}

  // Super Admin bypass
  if(u===SUPER_ADMIN_USERNAME&&p===SUPER_ADMIN_PASSWORD){
    currentUser={username:SUPER_ADMIN_USERNAME,namaUsaha:'KasirGO Super Admin'};
    LS.set('kg_currentUser',currentUser);applyBranding();showApp();
    showToast('Selamat datang, Super Admin! 👑','success');return;
  }

  const acc=accounts.find(a=>a.username===u&&a.password===p);
  if(!acc){showToast('Username atau password salah!','error');return;}

  // Validasi role sesuai tab yang dipilih
  const selectedRole=_selectedLoginRole||'admin';
  const accRole=acc.role||'admin';
  if(accRole!==selectedRole){
    const wrongLabel=accRole==='admin'?'Admin':'Kasir';
    const rightLabel=selectedRole==='admin'?'Admin':'Kasir';
    showToast(`Akun ini terdaftar sebagai ${wrongLabel}. Silakan pilih tab ${wrongLabel} untuk masuk.`,'warning');
    return;
  }

  currentUser={username:acc.username,namaUsaha:acc.namaUsaha,role:acc.role};
  LS.set('kg_currentUser',currentUser);
  settings.namaUsaha=acc.namaUsaha||settings.namaUsaha;settings.logo=acc.logo||settings.logo;
  settings.alamat=acc.alamat||settings.alamat;settings.telp=acc.telp||settings.telp;
  saveData();applyBranding();showApp();
  showToast(`Selamat datang, ${acc.username}! ${acc.role==='admin'?'👑 Admin':'🖥️ Kasir'}`,'success');
}

function doRegister(){
  const nu=document.getElementById('regNamaUsaha').value.trim();
  const u=document.getElementById('regUsername').value.trim();
  const p=document.getElementById('regPassword').value;
  const c=document.getElementById('regConfirm').value;
  if(!nu){showToast('Nama usaha wajib diisi!','error');return;}
  if(!u){showToast('Username wajib diisi!','error');return;}
  if(p.length<6){showToast('Password minimal 6 karakter!','error');return;}
  if(p!==c){showToast('Konfirmasi password tidak cocok!','error');return;}
  if(accounts.find(a=>a.username===u)){showToast('Username sudah digunakan!','error');return;}
  const ts=new Date().toISOString().split('T')[0];
  const ex=new Date();ex.setDate(ex.getDate()+TRIAL_DAYS);
  accounts.push({username:u,password:p,namaUsaha:nu,logo:'',alamat:'',telp:'',role:'admin',trial_start_date:ts,subscription_status:'trial',expiry_date:ex.toISOString().split('T')[0]});
  LS.set('kg_accounts',accounts);
  showToast('Akun berhasil! Free Trial 30 hari aktif otomatis.','success');
  ['regNamaUsaha','regUsername','regPassword','regConfirm'].forEach(id=>document.getElementById(id).value='');
  switchAuth('login');
}

function doLogout(){
  Swal.fire({title:'Keluar?',text:'Anda akan keluar dari KasirGO.',icon:'question',showCancelButton:true,confirmButtonColor:'#4a90e2',cancelButtonColor:'#aaa',confirmButtonText:'Ya, keluar',cancelButtonText:'Batal'})
  .then(r=>{if(r.isConfirmed){currentUser=null;LS.set('kg_currentUser',null);cart=[];stopRealTime();destroyDT('produk');destroyDT('laporan');document.getElementById('appWrapper').style.display='none';document.getElementById('authWrapper').style.display='';const lk=document.getElementById('kasirLockScreen');if(lk)lk.style.display='none';document.getElementById('loginUsername').value='';document.getElementById('loginPassword').value='';}});
}

function togglePwd(id,btn){const inp=document.getElementById(id);const ic=btn.querySelector('i');if(inp.type==='password'){inp.type='text';ic.className='fa-solid fa-eye-slash';}else{inp.type='password';ic.className='fa-solid fa-eye';}}

function showApp(){document.getElementById('authWrapper').style.display='none';document.getElementById('appWrapper').style.display='';const lk=document.getElementById('kasirLockScreen');if(lk)lk.style.display='none';initApp();}

// ── INIT ──
function initApp(){
  applyBranding();applyRoleBasedUI();setDate();
  renderDashboard();_renderDashExtras();
  renderProdukGrid();populateKategoriFilter();updateInvNum();
  _updateNavBadges();checkAndShowGraceBanner();
  if(!shiftStartTime){shiftStartTime=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});LS.set('kg_shiftStart',shiftStartTime);}
  if('Notification'in window&&Notification.permission==='default')Notification.requestPermission();
  startRealTime();
  if(isSystemLocked())showLockedScreen();
}

function applyRoleBasedUI(){
  const role=getUserRole();const isSA=isSuperAdmin();
  const isKasir=role==='kasir';
  const hideSel=(sel,v)=>{const el=document.querySelector(sel);if(el)el.style.display=v;};
  hideSel('.nav-link[onclick*="kasir"]',     isKasir?'none':'');
  hideSel('.nav-link[onclick*="laporan"]',   ''); // kasir juga bisa lihat laporan shift-nya
  hideSel('.nav-link[onclick*="pengaturan"]',isKasir?'none':'');
  hideSel('.nav-link[onclick*="langganan"]', isKasir?'none':'');
  hideSel('.nav-link[onclick*="superadmin"]',isSA?'':'none');
  const si=document.getElementById('sidebarSubInfo');
  if(si&&!isSA&&!isKasir){
    const sub=getAccountSubscription(currentUser.username);
    if(sub){
      const color=sub.isExpired?'#ea5455':sub.daysLeft<=7?'#f59e0b':'#28c76f';
      const text=sub.isExpired?'EXPIRED':sub.status==='trial'?`Trial ${sub.daysLeft}h`:`Aktif ${sub.daysLeft}h`;
      si.innerHTML=`<span style="font-size:10px;background:${color};color:#fff;border-radius:4px;padding:2px 7px;margin-top:4px;display:inline-block">${text}</span>`;
      si.style.display='';
    }
  }else if(si)si.style.display='none';
}

function applyBranding(){
  const nama=settings.namaUsaha||'KasirGO';const logo=settings.logo||'';
  const logoEl=document.getElementById('sidebarLogoImg');
  if(logoEl)logoEl.innerHTML=logo?`<img src="${logo}" alt="logo"/>`:`<i class="fa-solid fa-cash-register"></i>`;
  const ids={sidebarAppName:nama,sidebarNamaUsaha:currentUser?.namaUsaha||nama,sidebarUsername:currentUser?.username||'Admin',mobileAppName:nama,loginAppName:nama,loginAppSub:settings.alamat||'Aplikasi Kasir Modern'};
  Object.entries(ids).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.textContent=v;});
  const av=document.getElementById('sidebarAvatar');if(av)av.textContent=(currentUser?.username||'A')[0].toUpperCase();
  const llogo=document.getElementById('loginLogoImg');if(llogo)llogo.innerHTML=logo?`<img src="${logo}" alt="logo"/>`:`<i class="fa-solid fa-cash-register"></i>`;
  const sn=document.getElementById('settNamaUsaha');
  if(sn){sn.value=settings.namaUsaha||'';document.getElementById('settAlamat').value=settings.alamat||'';document.getElementById('settTelp').value=settings.telp||'';document.getElementById('settPpn').value=settings.ppn||11;document.getElementById('settPpnAktif').checked=settings.ppnAktif!==false;document.getElementById('settHeader').value=settings.header||'';document.getElementById('settFooter').value=settings.footer||'';if(logo)document.getElementById('logoPreviewWrap').innerHTML=`<img src="${logo}" alt="logo"/><div style="font-size:11px;color:var(--text-muted);margin-top:4px">Klik untuk ganti logo</div>`;}
  const pl=document.getElementById('ppnPctLabel');if(pl)pl.textContent=settings.ppn||11;
  const pr=document.getElementById('ppnRow');if(pr)pr.style.display=settings.ppnAktif!==false?'':'none';
}

function setDate(){const s=new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});['dashDate','txDate'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=s;});}

// ── REAL-TIME ENGINE ──
function startRealTime(){
  stopRealTime();
  _realTimeTimer=setInterval(()=>{
    const active=document.querySelector('.page.active');if(!active)return;
    const pid=active.id.replace('page-','');
    if(pid==='dashboard'){renderDashboard();_renderDashExtras();}
    if(pid==='hutang')renderHutangPage();
    if(pid==='laporan')filterLaporan();
    _updateNavBadges();checkAndShowGraceBanner();
  },5000);
}
function stopRealTime(){if(_realTimeTimer){clearInterval(_realTimeTimer);_realTimeTimer=null;}}

// ── NAVIGATION ──
function showPage(pageId,el){
  if(window.innerWidth<992)toggleSidebar(false);
  const role=getUserRole();const locked=isSystemLocked();const isKasir=role==='kasir';
  if(isKasir&&locked){showLockedScreen();return;}
  const kasirRestricted=['kasir','pengaturan','langganan','superadmin'];
  if(isKasir&&kasirRestricted.includes(pageId)){showToast('Akses terbatas untuk Kasir!','warning');return;}
  if(locked&&!isKasir&&!['laporan','langganan','dashboard'].includes(pageId)){showToast('Akun terkunci. Perpanjang langganan!','error');pageId='langganan';el=null;}
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
  const pe=document.getElementById('page-'+pageId);if(pe)pe.classList.add('active');
  if(el)el.classList.add('active');
  if(pageId==='dashboard'){renderDashboard();_renderDashExtras();checkAndShowGraceBanner();}
  if(pageId==='transaksi'){if(locked){showToast('Transaksi diblokir!','error');showPage('langganan',null);return;}renderProdukGrid();_showStokNotifBar();}
  if(pageId==='produk'){if(locked){showPage('langganan',null);return;}buildTableProduk();_showStokNotifBar();}
  if(pageId==='kategori'){if(locked){showPage('langganan',null);return;}renderKategori();}
  if(pageId==='hutang'){if(locked){showPage('langganan',null);return;}renderHutangPage();}
  if(pageId==='laporan')buildTableLaporan();
  if(pageId==='kasir')renderKasirPage();
  if(pageId==='pengaturan')applyBranding();
  if(pageId==='langganan')renderLanggananPage();
  if(pageId==='superadmin')renderSuperAdminPage();
}
function toggleSidebar(force){const sb=document.getElementById('sidebar');const ov=document.getElementById('sidebarOverlay');const open=force!==undefined?force:!sb.classList.contains('open');sb.classList.toggle('open',open);ov.classList.toggle('open',open);}

// ── TOAST ──
function showToast(msg,type='success'){
  const icons={success:'fa-check',error:'fa-xmark',warning:'fa-exclamation',info:'fa-info'};
  const t=document.createElement('div');t.className=`toast-item ${type}`;
  t.innerHTML=`<div class="toast-icon"><i class="fa-solid ${icons[type]}"></i></div><div class="toast-msg">${msg}</div><button class="toast-close" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>`;
  document.getElementById('toastContainer').appendChild(t);
  setTimeout(()=>{t.style.animation='slideOut .3s ease forwards';setTimeout(()=>t.remove(),300);},3500);
}

// ── NAV BADGES ──
function _updateNavBadges(){
  const lc=produk.filter(p=>p.stok<5).length;const sb=document.getElementById('navStokBadge');if(sb){sb.textContent=lc;sb.style.display=lc>0?'':'none';}
  const today=new Date().toISOString().split('T')[0];
  const jt=hutangPiutang.filter(h=>h.status==='aktif'&&h.jenis==='hutang'&&h.jatuhTempo&&h.jatuhTempo<=today).length;
  const ak=hutangPiutang.filter(h=>h.status==='aktif').length;
  const hb=document.getElementById('navHutangBadge');
  if(hb){if(jt>0){hb.textContent=jt+' JT';hb.style.display='';}else if(ak>0){hb.textContent=ak;hb.style.display='';}else hb.style.display='none';}
}

// ── STOK NOTIF BAR ──
function _showStokNotifBar(){
  const old=document.getElementById('stokNotifBar');if(old)old.remove();
  const kr=produk.filter(p=>p.stok===0);const mn=produk.filter(p=>p.stok>0&&p.stok<5);
  if(!kr.length&&!mn.length)return;
  const ap=document.querySelector('.page.active');if(!ap)return;
  const ph=ap.querySelector('.page-header');if(!ph)return;
  const bar=document.createElement('div');bar.id='stokNotifBar';bar.className='stok-notif-bar';
  bar.innerHTML=`<i class="fa-solid fa-triangle-exclamation"></i><span>${kr.length?`<strong style="color:var(--red)">${kr.length} produk STOK HABIS</strong>`:''} ${kr.length&&mn.length?'&':''}  ${mn.length?`<strong style="color:var(--yellow)">${mn.length} stok menipis (&lt;5)</strong>`:''} — segera restock!</span><button class="snb-close" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>`;
  ph.after(bar);
}
setInterval(()=>{const lc=produk.filter(p=>p.stok<5).length;if(lc>0&&'serviceWorker'in navigator&&Notification.permission==='granted'){navigator.serviceWorker.ready.then(r=>r.showNotification('KasirGO — Stok Menipis',{body:`${lc} produk perlu restok`,icon:'./icons/icon-192x192.png',tag:'stok-notif'})).catch(()=>{});}},1800000);

// ── DASHBOARD ──
function renderDashboard(){
  const today=new Date().toISOString().split('T')[0];const tx=transaksi.filter(t=>t.tanggal===today);
  const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  s('statPenjualan',formatRp(tx.reduce((a,t)=>a+t.total,0)));s('statTransaksi',tx.length);s('statProduk',produk.length);
  const low=produk.filter(p=>p.stok<5);s('statStokMenipis',low.length);
  renderStokMenipis(low);renderTerlaris();renderChart();
}
function _renderDashExtras(){
  const el=document.getElementById('dashHutangList');
  if(el){
    const ak=hutangPiutang.filter(h=>h.status==='aktif').slice(0,4);
    el.innerHTML=!ak.length?'<div style="text-align:center;padding:16px 0;color:var(--text-muted);font-size:12px"><i class="fa-solid fa-check-circle" style="color:var(--green);margin-right:6px"></i>Tidak ada hutang aktif</div>':ak.map(h=>`<div class="dash-hutang-item"><div class="dhi-avatar ${h.jenis}">${h.nama[0].toUpperCase()}</div><div><div class="dhi-name">${h.nama}</div><div style="font-size:10px;color:var(--text-muted)">${h.jenis==='hutang'?'💸 Hutang':'💰 Piutang'} · ${formatTanggal(h.tglCatat)}</div></div><div class="dhi-amount ${h.jenis}">${formatRp(h.sisa)}</div></div>`).join('');
  }
  const ke=document.getElementById('dashKasirInfo');
  if(ke){
    const today=new Date().toISOString().split('T')[0];const kasir=currentUser?.username||'admin';
    const stx=transaksi.filter(t=>t.tanggal===today&&t.kasir===kasir);
    ke.innerHTML=`<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--border-soft)"><div class="user-avatar" style="width:38px;height:38px;font-size:15px">${(kasir[0]||'A').toUpperCase()}</div><div><div style="font-size:13px;font-weight:700">${kasir}</div><div style="font-size:11px;color:var(--text-muted)">Shift mulai: ${shiftStartTime||'—'}</div></div><span class="badge-custom green ms-auto">Aktif</span></div><div style="display:flex;gap:16px;padding:12px 0"><div style="flex:1;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--primary)">${stx.length}</div><div style="font-size:11px;color:var(--text-muted)">Transaksi</div></div><div style="flex:1;text-align:center"><div style="font-size:15px;font-weight:800;color:var(--green)">${formatRp(stx.reduce((s,t)=>s+t.total,0))}</div><div style="font-size:11px;color:var(--text-muted)">Penjualan</div></div><div style="flex:1;text-align:center"><div style="font-size:20px;font-weight:800;color:var(--purple)">${accounts.length}</div><div style="font-size:11px;color:var(--text-muted)">Kasir</div></div></div>`;
  }
}
function renderStokMenipis(list){
  document.getElementById('stokMenipisCount').textContent=list.length;
  const el=document.getElementById('stokMenipisList');
  if(!list.length){el.innerHTML='<div class="stok-item" style="color:var(--text-muted);font-size:12px;padding:12px 0;text-align:center">✅ Semua stok aman</div>';return;}
  el.innerHTML=list.map(p=>`<div class="stok-item"><div class="stok-item-icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div><div class="stok-item-name">${p.nama}</div><div style="font-size:10px;color:var(--text-muted)">${getCatName(p.kategori_id)}</div></div><div class="stok-item-qty">${p.stok} ${p.satuan}</div></div>`).join('');
}
function renderTerlaris(){
  const sold={};transaksi.forEach(tx=>tx.items.forEach(i=>{sold[i.produk_id]=(sold[i.produk_id]||0)+i.qty;}));
  const top5=produk.map(p=>({...p,terjual:sold[p.id]||0,pendapatan:(sold[p.id]||0)*p.harga_jual})).sort((a,b)=>b.terjual-a.terjual).slice(0,5);
  const el=document.getElementById('tabelTerlaris');if(el)el.innerHTML=top5.map((p,i)=>`<tr><td><span class="tag-badge blue">${i+1}</span></td><td><strong>${p.nama}</strong></td><td>${getCatName(p.kategori_id)}</td><td><span class="tag-badge green">${p.terjual}</span></td><td><strong>${formatRp(p.pendapatan)}</strong></td></tr>`).join('');
}
function renderChart(){
  const ctx=document.getElementById('chartPenjualan');if(!ctx)return;
  const labels=[],values=[];
  for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const ds=d.toISOString().split('T')[0];labels.push(d.toLocaleDateString('id-ID',{weekday:'short',day:'numeric'}));values.push(transaksi.filter(t=>t.tanggal===ds).reduce((s,t)=>s+t.total,0));}
  if(window._chart)window._chart.destroy();
  window._chart=new Chart(ctx,{type:'line',data:{labels,datasets:[{label:'Penjualan',data:values,borderColor:'#4a90e2',backgroundColor:'rgba(74,144,226,.09)',borderWidth:2.5,fill:true,tension:.4,pointBackgroundColor:'#4a90e2',pointRadius:5,pointHoverRadius:7}]},options:{responsive:true,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>' '+formatRp(c.parsed.y)}}},scales:{x:{grid:{color:'rgba(0,0,0,.04)'},ticks:{font:{family:'Plus Jakarta Sans',size:11},color:'#7c8fa6'}},y:{grid:{color:'rgba(0,0,0,.04)'},ticks:{font:{family:'DM Mono',size:10},color:'#7c8fa6',callback:v=>'Rp'+(v>=1000?(v/1000).toFixed(0)+'rb':v)}}}}});
}

// ── TRANSAKSI ──
function renderProdukGrid(){
  const q=(document.getElementById('searchProduk')?.value||'').toLowerCase();
  const kf=document.getElementById('filterKategoriTx')?.value||'';
  const grid=document.getElementById('produkGrid');if(!grid)return;
  const list=produk.filter(p=>(p.nama.toLowerCase().includes(q)||p.barcode.includes(q))&&(!kf||String(p.kategori_id)===kf));
  grid.innerHTML=list.length?list.map(p=>{
    const low=p.stok>0&&p.stok<5;
    return`<div class="produk-card ${p.stok===0?'stok-habis':''}">
      <div class="produk-img-wrap">${p.gambar?`<img src="${p.gambar}" alt="${p.nama}" style="width:100%;height:100%;object-fit:contain;display:block"/>`:`<span>${getProdukEmoji(p.kategori_id)}</span>`}</div>
      <div class="produk-info">
        <div class="produk-name" title="${p.nama}">${p.nama}</div>
        <div class="produk-price">${formatRp(p.harga_jual)}</div>
        <div class="produk-stok ${low?'low':''}">${p.stok===0?'❌ Habis':`Stok: ${p.stok} ${p.satuan}${low?' ⚠️':''}`}</div>
      </div>
      ${p.stok>0?`<button class="btn-add-produk" onclick="addToCart(${p.id})"><i class="fa-solid fa-plus me-1"></i>Tambah</button>`:''}
    </div>`;
  }).join(''):`<div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:var(--text-muted)"><i class="fa-solid fa-search" style="font-size:24px;margin-bottom:10px;display:block;opacity:.3"></i>Produk tidak ditemukan</div>`;
}

function populateKategoriFilter(){
  const sel=document.getElementById('filterKategoriTx');if(!sel)return;
  sel.innerHTML='<option value="">Semua Kategori</option>'+kategori.map(k=>`<option value="${k.id}">${k.nama}</option>`).join('');
}

function addToCart(id){
  if(isSystemLocked()){showToast('Akun terkunci!','error');return;}
  const p=produk.find(x=>x.id===id);if(!p||p.stok===0)return;
  const ex=cart.find(c=>c.produk_id===id);
  if(ex){if(ex.qty>=p.stok){showToast(`Stok ${p.nama} tidak cukup!`,'warning');return;}ex.qty++;}
  else cart.push({produk_id:id,qty:1});
  showToast(`${p.nama} ditambahkan 🛒`,'success');renderCart();
}
function removeFromCart(id){cart=cart.filter(c=>c.produk_id!==id);renderCart();}
function changeQty(id,d){
  const item=cart.find(c=>c.produk_id===id);const p=produk.find(x=>x.id===id);if(!item)return;
  item.qty+=d;if(item.qty<=0){removeFromCart(id);return;}
  if(item.qty>p.stok){item.qty=p.stok;showToast('Melebihi stok!','warning');}renderCart();
}
function renderCart(){
  const count=cart.reduce((s,c)=>s+c.qty,0);document.getElementById('cartCount').textContent=count;
  const el=document.getElementById('cartItems');
  if(!cart.length){el.innerHTML='<div class="empty-cart"><i class="fa-solid fa-cart-shopping"></i><p>Keranjang kosong</p></div>';calcTotal();return;}
  el.innerHTML=cart.map(c=>{const p=produk.find(x=>x.id===c.produk_id);const sub=p.harga_jual*c.qty;return`<div class="cart-row"><div class="cart-row-info"><div class="cart-row-name">${p.nama}</div><div class="cart-row-price">${formatRp(p.harga_jual)}/${p.satuan}</div></div><div class="cart-qty-ctrl"><button class="btn-qty" onclick="changeQty(${p.id},-1)">−</button><span class="qty-num">${c.qty}</span><button class="btn-qty" onclick="changeQty(${p.id},1)">+</button></div><div class="cart-subtotal ms-1">${formatRp(sub)}</div><button class="btn-del-cart ms-1" onclick="removeFromCart(${p.id})"><i class="fa-solid fa-trash"></i></button></div>`;}).join('');
  calcTotal();
}
function calcTotal(){
  const subtotal=cart.reduce((s,c)=>{const p=produk.find(x=>x.id===c.produk_id);return s+(p?p.harga_jual*c.qty:0);},0);
  const disc=parseFloat(document.getElementById('discountInput')?.value||0);
  const ppnPct=settings.ppnAktif!==false?(settings.ppn||11):0;
  const afterD=subtotal*(1-disc/100);const ppn=afterD*(ppnPct/100);const total=afterD+ppn;
  const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  s('cartSubtotal',formatRp(subtotal));s('cartPpn',formatRp(ppn));s('cartTotal',formatRp(total));
  const qa=document.getElementById('qrisAmount');if(qa)qa.textContent=formatRp(total);
  const da=document.getElementById('debitAmount');if(da)da.textContent=formatRp(total);
  calcChange();return{subtotal,afterD,ppn,total,disc};
}
function calcChange(){
  if(payMethod!=='tunai')return;
  const total=parseInt((document.getElementById('cartTotal')?.textContent||'').replace(/[^0-9]/g,''))||0;
  const bayar=parseFloat(document.getElementById('payAmount')?.value||0);
  const change=bayar-total;const el=document.getElementById('changeAmount');
  if(el){el.textContent=formatRp(Math.max(0,change));el.style.color=change<0?'var(--red)':'var(--green)';}
}
function setPayMethod(m,el){
  payMethod=m;document.querySelectorAll('.pay-btn').forEach(b=>b.classList.remove('active'));el.classList.add('active');
  document.getElementById('tunaiSection').style.display=m==='tunai'?'':'none';
  document.getElementById('qrisSection').style.display=m==='qris'?'':'none';
  document.getElementById('debitSection').style.display=m==='debit'?'':'none';
  if(m==='tunai')calcChange();
}
function clearCart(){
  if(!cart.length)return;
  Swal.fire({title:'Kosongkan keranjang?',text:'Semua item akan dihapus.',icon:'warning',showCancelButton:true,confirmButtonColor:'#ea5455',cancelButtonColor:'#aaa',confirmButtonText:'Ya',cancelButtonText:'Batal'})
  .then(r=>{if(r.isConfirmed){cart=[];document.getElementById('discountInput').value=0;document.getElementById('payAmount').value='';renderCart();}});
}
function prosesTransaksi(){
  if(isSystemLocked()){showToast('Akun terkunci!','error');return;}
  if(!cart.length){showToast('Keranjang masih kosong!','warning');return;}
  const totals=calcTotal();
  if(payMethod==='qris'){Swal.fire({title:'📱 Konfirmasi QRIS',html:`<div style="text-align:center;margin:10px 0"><div style="font-size:13px;color:#7c8fa6;margin-bottom:6px">Total yang harus dibayar:</div><div style="font-size:26px;font-weight:800;color:#4a90e2">${formatRp(totals.total)}</div><div style="font-size:11px;color:#7c8fa6;margin-top:8px;padding:8px;background:#f0f4f9;border-radius:8px">Pastikan pembayaran QRIS sudah berhasil</div></div>`,showCancelButton:true,confirmButtonColor:'#4a90e2',cancelButtonColor:'#aaa',confirmButtonText:'✅ Sudah Bayar',cancelButtonText:'Batal'}).then(r=>{if(r.isConfirmed)prosesInternal();});return;}
  if(payMethod==='debit'){Swal.fire({title:'💳 Konfirmasi Kartu Debit',html:`<div style="text-align:center;margin:10px 0"><div style="font-size:13px;color:#7c8fa6;margin-bottom:6px">Total yang harus dibayar:</div><div style="font-size:26px;font-weight:800;color:#4a90e2">${formatRp(totals.total)}</div><div style="font-size:11px;color:#7c8fa6;margin-top:8px;padding:8px;background:#f0f4f9;border-radius:8px">Pastikan transaksi disetujui mesin EDC</div></div>`,showCancelButton:true,confirmButtonColor:'#4a90e2',cancelButtonColor:'#aaa',confirmButtonText:'✅ Sudah Disetujui',cancelButtonText:'Batal'}).then(r=>{if(r.isConfirmed)prosesInternal();});return;}
  const bayar=parseFloat(document.getElementById('payAmount').value||0);
  if(bayar<totals.total){showToast('Jumlah bayar kurang!','error');return;}
  prosesInternal();
}
function prosesInternal(){
  const totals=calcTotal();
  const disc=parseFloat(document.getElementById('discountInput').value||0);
  const bayar=payMethod==='tunai'?parseFloat(document.getElementById('payAmount').value||0):totals.total;
  const newInv='INV-'+String(transaksi.length+1).padStart(4,'0');
  const today=new Date().toISOString().split('T')[0];
  const snapItems=[];
  cart.forEach(c=>{const p=produk.find(x=>x.id===c.produk_id);if(p){p.stok-=c.qty;snapItems.push({produk_id:c.produk_id,nama:p.nama,harga:p.harga_jual,qty:c.qty,subtotal:p.harga_jual*c.qty});if(p.stok<5&&p.stok>=0)showToast(`⚠️ Stok ${p.nama} tinggal ${p.stok}!`,'warning');}});
  const txData={id:transaksi.length+1,invoice:newInv,tanggal:today,waktu:new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}),pelanggan:'Umum',items:cart.map(c=>({produk_id:c.produk_id,qty:c.qty})),snapItems,subtotal:totals.subtotal,diskon:disc,afterDiskon:totals.afterD,ppn:totals.ppn,total:totals.total,bayar,kembali:payMethod==='tunai'?bayar-totals.total:0,metode:payMethod,kasir:currentUser?.username||'Admin'};
  transaksi.push(txData);lastStruk=txData;saveData();showStruk(txData);
  cart=[];document.getElementById('discountInput').value=0;document.getElementById('payAmount').value='';
  updateInvNum();renderCart();renderProdukGrid();
  const dp=document.getElementById('page-dashboard');if(dp&&dp.classList.contains('active')){renderDashboard();_renderDashExtras();}
}
function updateInvNum(){const n=String(transaksi.length+1).padStart(4,'0');const el=document.getElementById('invNum');if(el)el.textContent=n;}

// ── STRUK ──
function buildStrukHtml(tx){
  const logo=settings.logo;const mL={tunai:'TUNAI',qris:'QRIS',debit:'KARTU DEBIT'};
  const logoHtml=logo?`<div class="struk-logo"><img src="${logo}" alt="logo"/></div>`:`<div class="struk-logo"><i class="fa-solid fa-cash-register"></i></div>`;
  const items=(tx.snapItems||[]).map(i=>`<div class="struk-item-row"><div class="struk-item-name">${i.nama}</div><div class="struk-item-qty">${i.qty} × ${formatRpNoSym(i.harga)}</div><div class="struk-item-price">${formatRp(i.subtotal)}</div></div>`).join('');
  const kembaliHtml=tx.metode==='tunai'?`<div class="struk-bayar-row"><span>Bayar</span><span>${formatRp(tx.bayar)}</span></div><div class="struk-kembali-row"><span>Kembalian</span><span>${formatRp(tx.kembali)}</span></div>`:`<div class="struk-bayar-row"><span>Pembayaran</span><span><b>${mL[tx.metode]||tx.metode}</b></span></div>`;
  return`<div class="struk-header">${logoHtml}<div class="struk-toko-nama">${settings.namaUsaha}</div>${settings.alamat?`<div class="struk-toko-alamat">${settings.alamat}</div>`:''} ${settings.telp?`<div class="struk-toko-telp">Telp: ${settings.telp}</div>`:''} ${settings.header?`<div class="struk-header-msg">${settings.header}</div>`:''}</div>
  <div class="struk-divider"></div>
  <div class="struk-info"><table><tr><td>Invoice</td><td>:</td><td>${tx.invoice}</td></tr><tr><td>Tanggal</td><td>:</td><td>${formatTanggal(tx.tanggal)}</td></tr><tr><td>Waktu</td><td>:</td><td>${tx.waktu||'-'}</td></tr><tr><td>Kasir</td><td>:</td><td>${tx.kasir}</td></tr><tr><td>Metode</td><td>:</td><td><span class="struk-metode">${mL[tx.metode]||tx.metode}</span></td></tr></table></div>
  <div class="struk-divider"></div>
  <div class="struk-items-header"><span style="flex:1">Item</span><span style="width:100px;text-align:center">Qty × Harga</span><span style="width:80px;text-align:right">Jumlah</span></div>
  <div class="struk-items">${items}</div>
  <div class="struk-divider"></div>
  <div class="struk-summary"><div class="struk-summary-row"><span>Subtotal</span><span>${formatRp(tx.subtotal)}</span></div>${tx.diskon?`<div class="struk-summary-row"><span>Diskon (${tx.diskon}%)</span><span>-${formatRp(tx.subtotal-tx.afterDiskon)}</span></div>`:''} ${tx.ppn?`<div class="struk-summary-row"><span>PPN (${settings.ppn}%)</span><span>${formatRp(tx.ppn)}</span></div>`:''}<div class="struk-total-row"><span>TOTAL</span><span>${formatRp(tx.total)}</span></div>${kembaliHtml}</div>
  ${settings.footer?`<div class="struk-divider"></div><div class="struk-footer">${settings.footer}</div>`:''}
  <div class="struk-footer" style="font-weight:600;border-top:none;margin-top:4px">✦ Terima Kasih ✦</div>`;
}
function showStruk(tx){document.getElementById('strukContent').innerHTML=buildStrukHtml(tx);new bootstrap.Modal(document.getElementById('modalStruk')).show();showToast(`${tx.invoice} berhasil diproses! 🎉`,'success');}
function cetakStruk(){
  const content=document.getElementById('strukContent').innerHTML;
  const w=window.open('','_blank');if(!w){showToast('Izinkan popup browser!','warning');return;}
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Struk</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{background:white;font-family:'Courier New',monospace;}.struk-wrap{width:80mm;margin:0 auto;padding:3mm 2mm;font-size:11px;color:#000;}.struk-header{text-align:center;margin-bottom:6px;}.struk-logo{width:48px;height:48px;border-radius:8px;overflow:hidden;margin:0 auto 6px;background:#eee;display:flex;align-items:center;justify-content:center;font-size:20px;border:1px solid #000;}.struk-logo img{width:100%;height:100%;object-fit:cover;}.struk-toko-nama{font-size:13px;font-weight:700;text-transform:uppercase;}.struk-toko-alamat,.struk-toko-telp{font-size:9px;margin-top:1px;}.struk-header-msg{font-size:9px;margin-top:2px;font-style:italic;}.struk-divider{border-top:1px dashed #000;margin:5px 0;}.struk-info table{width:100%;font-size:10px;border-collapse:collapse;}.struk-info td{padding:1px;vertical-align:top;}.struk-info td:first-child{width:52px;}.struk-items-header{display:flex;font-size:9px;font-weight:700;text-transform:uppercase;margin:3px 0 2px;border-bottom:1px solid #000;padding-bottom:2px;}.struk-item-row{display:flex;justify-content:space-between;font-size:10px;padding:2px 0;border-bottom:1px dotted #bbb;}.struk-item-name{flex:1;word-break:break-word;}.struk-item-qty{width:88px;text-align:center;font-size:9px;white-space:nowrap;}.struk-item-price{width:68px;text-align:right;font-weight:700;white-space:nowrap;}.struk-summary-row{display:flex;justify-content:space-between;font-size:10px;margin-bottom:1px;}.struk-total-row{display:flex;justify-content:space-between;font-size:13px;font-weight:700;border-top:2px solid #000;border-bottom:2px solid #000;margin:3px 0;padding:3px 0;}.struk-bayar-row,.struk-kembali-row{display:flex;justify-content:space-between;font-size:10px;margin-top:2px;}.struk-kembali-row{font-size:12px;font-weight:700;}.struk-footer{text-align:center;font-size:9px;margin-top:5px;padding-top:5px;border-top:1px dashed #000;line-height:1.5;}@page{margin:0;size:80mm auto;}</style></head><body><div class="struk-wrap">${content}<div style="text-align:center;font-size:9px;color:#999;border-top:1px dashed #aaa;margin-top:8px;padding-top:4px">✂ ─── potong di sini ─── ✂</div></div><script>window.onload=function(){window.print()}<\/script></body></html>`);w.document.close();
}

// ── DATATABLES ──
function destroyDT(w){if(w==='produk'&&dtProduk){try{dtProduk.destroy();}catch(e){}dtProduk=null;}if(w==='laporan'&&dtLaporan){try{dtLaporan.destroy();}catch(e){}dtLaporan=null;}}

// ── PRODUK ──
function buildTableProduk(){
  destroyDT('produk');const tbody=document.getElementById('tableProdukBody');if(!tbody)return;
  tbody.innerHTML=produk.map(p=>{const sb=p.stok===0?`<span class="tag-badge red">${p.stok}</span>`:p.stok<5?`<span class="tag-badge yellow">${p.stok}</span>`:`<span class="tag-badge green">${p.stok}</span>`;return`<tr><td><code style="font-size:11px">${p.barcode}</code></td><td><strong>${p.nama}</strong></td><td>${getCatName(p.kategori_id)}</td><td>${p.satuan}</td><td>${formatRp(p.harga_beli)}</td><td><strong>${formatRp(p.harga_jual)}</strong></td><td>${sb}</td><td><button class="btn-tbl edit" onclick="openModalProduk(${p.id})"><i class="fa-solid fa-pen"></i></button><button class="btn-tbl delete" onclick="hapusProduk(${p.id})"><i class="fa-solid fa-trash"></i></button></td></tr>`;}).join('');
  try{dtProduk=$('#tableProduk').DataTable({language:{search:'Cari:',lengthMenu:'Tampilkan _MENU_ data',info:'Data _START_–_END_ dari _TOTAL_',paginate:{next:'›',previous:'‹'},zeroRecords:'Tidak ada data',infoEmpty:'Tidak ada data',infoFiltered:'(difilter dari _MAX_ total)'},columnDefs:[{orderable:false,targets:-1}],order:[[1,'asc']],pageLength:10,destroy:true});}catch(e){console.warn('DT produk:',e.message);}
}
function openModalProduk(id=null){
  editProdukId=id;document.getElementById('modalProdukTitle').textContent=id?'Edit Produk':'Tambah Produk';
  document.getElementById('pKategori').innerHTML=kategori.map(k=>`<option value="${k.id}">${k.nama}</option>`).join('');
  if(id){const p=produk.find(x=>x.id===id);document.getElementById('pBarcode').value=p.barcode;document.getElementById('pNama').value=p.nama;document.getElementById('pKategori').value=p.kategori_id;document.getElementById('pSatuan').value=p.satuan;document.getElementById('pHargaBeli').value=p.harga_beli;document.getElementById('pHargaJual').value=p.harga_jual;document.getElementById('pStok').value=p.stok;if(p.gambar){document.getElementById('imgPreview').src=p.gambar;document.getElementById('imgPreviewWrap').style.display='block';}else document.getElementById('imgPreviewWrap').style.display='none';}
  else{['pBarcode','pNama','pHargaBeli','pHargaJual','pStok'].forEach(i=>document.getElementById(i).value='');document.getElementById('imgPreviewWrap').style.display='none';document.getElementById('pGambar').value='';}
  new bootstrap.Modal(document.getElementById('modalProduk')).show();
}
function simpanProduk(){
  const nama=document.getElementById('pNama').value.trim();const katId=parseInt(document.getElementById('pKategori').value);
  const hj=parseFloat(document.getElementById('pHargaJual').value)||0;const stok=parseInt(document.getElementById('pStok').value);
  if(!nama||!hj||isNaN(stok)){showToast('Lengkapi field wajib!','error');return;}
  const imgEl=document.getElementById('imgPreview');
  const gambar=imgEl&&document.getElementById('imgPreviewWrap').style.display!=='none'?imgEl.src:'';
  const data={barcode:document.getElementById('pBarcode').value||genBarcode(),nama,kategori_id:katId,satuan:document.getElementById('pSatuan').value,harga_beli:parseFloat(document.getElementById('pHargaBeli').value)||0,harga_jual:hj,stok,gambar};
  if(editProdukId){const i=produk.findIndex(p=>p.id===editProdukId);produk[i]={...produk[i],...data};showToast(`"${nama}" diperbarui!`,'success');}
  else{produk.push({id:Date.now(),...data});showToast(`"${nama}" ditambahkan!`,'success');}
  saveData();bootstrap.Modal.getInstance(document.getElementById('modalProduk')).hide();buildTableProduk();
}
function hapusProduk(id){
  const p=produk.find(x=>x.id===id);
  Swal.fire({title:'Hapus Produk?',html:`<b>${p.nama}</b> akan dihapus permanen.`,icon:'warning',showCancelButton:true,confirmButtonColor:'#ea5455',cancelButtonColor:'#aaa',confirmButtonText:'Hapus',cancelButtonText:'Batal'})
  .then(r=>{if(r.isConfirmed){produk=produk.filter(x=>x.id!==id);saveData();showToast(`"${p.nama}" dihapus.`,'info');buildTableProduk();}});
}
function previewGambar(input){if(input.files&&input.files[0]){const r=new FileReader();r.onload=e=>{document.getElementById('imgPreview').src=e.target.result;document.getElementById('imgPreviewWrap').style.display='block';};r.readAsDataURL(input.files[0]);}}

// ── KATEGORI (icon dihapus dari tab/grid, hanya di tabel manajemen) ──
function renderKategori(){
  document.getElementById('kategoriBody').innerHTML=kategori.map((k,i)=>`<tr><td>${i+1}</td><td><strong>${k.nama}</strong></td><td><small style="color:var(--text-muted);font-size:10px">${k.icon}</small></td><td><span class="tag-badge blue">${produk.filter(p=>p.kategori_id===k.id).length}</span></td><td><button class="btn-tbl edit" onclick="editKategori(${k.id})"><i class="fa-solid fa-pen"></i></button><button class="btn-tbl delete" onclick="hapusKategori(${k.id})"><i class="fa-solid fa-trash"></i></button></td></tr>`).join('');
}
function tambahKategori(){
  const nama=document.getElementById('namaKategoriInput').value.trim();const icon=document.getElementById('iconKategoriInput').value.trim()||'fa-solid fa-tag';
  if(!nama){showToast('Nama kategori wajib!','error');return;}
  if(editKategoriId){const i=kategori.findIndex(k=>k.id===editKategoriId);kategori[i]={...kategori[i],nama,icon};showToast('Kategori diperbarui!','success');batalEditKategori();}
  else{kategori.push({id:Date.now(),nama,icon});showToast(`"${nama}" ditambahkan!`,'success');}
  document.getElementById('namaKategoriInput').value='';document.getElementById('iconKategoriInput').value='';
  saveData();renderKategori();populateKategoriFilter();
}
function editKategori(id){const k=kategori.find(x=>x.id===id);editKategoriId=id;document.getElementById('namaKategoriInput').value=k.nama;document.getElementById('iconKategoriInput').value=k.icon;document.getElementById('formKatTitle').textContent='Edit Kategori';document.getElementById('btnKatLabel').textContent='Update Kategori';document.getElementById('btnKatBatal').style.display='';}
function batalEditKategori(){editKategoriId=null;document.getElementById('namaKategoriInput').value='';document.getElementById('iconKategoriInput').value='';document.getElementById('formKatTitle').textContent='Tambah Kategori';document.getElementById('btnKatLabel').textContent='Simpan Kategori';document.getElementById('btnKatBatal').style.display='none';}
function hapusKategori(id){
  const k=kategori.find(x=>x.id===id);if(produk.some(p=>p.kategori_id===id)){showToast('Kategori masih memiliki produk!','error');return;}
  Swal.fire({title:'Hapus Kategori?',html:`<b>${k.nama}</b> akan dihapus.`,icon:'warning',showCancelButton:true,confirmButtonColor:'#ea5455',cancelButtonColor:'#aaa',confirmButtonText:'Hapus',cancelButtonText:'Batal'})
  .then(r=>{if(r.isConfirmed){kategori=kategori.filter(x=>x.id!==id);saveData();showToast('Kategori dihapus.','info');renderKategori();}});
}

// ── LAPORAN REAL-TIME + PERIODE FILTER ──
function buildTableLaporan(){
  destroyDT('laporan');
  // Tampilkan info scope untuk kasir
  const role=getUserRole();const kasirOnly=role==='kasir';
  const infoEl=document.getElementById('laporanKasirInfo');
  if(infoEl){
    if(kasirOnly){
      infoEl.style.display='';
      infoEl.innerHTML=`<div style="display:flex;align-items:center;gap:10px;background:rgba(74,144,226,.08);border:1px solid rgba(74,144,226,.2);border-radius:10px;padding:10px 14px;margin-bottom:12px">
        <i class="fa-solid fa-user-clock" style="color:var(--primary);font-size:16px"></i>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--primary)">Laporan Shift Saya</div>
          <div style="font-size:11px;color:var(--text-muted)">Hanya menampilkan transaksi yang Anda proses sebagai kasir <strong>${currentUser?.username||''}</strong></div>
        </div>
      </div>`;
    } else {
      infoEl.style.display='none';
    }
  }
  // Export PDF tetap tampil untuk semua role
  const exportBtn=document.getElementById('btnExportPDF');
  if(exportBtn)exportBtn.style.display='';
  setLaporanPeriode(laporanPeriode);
}
function setLaporanPeriode(p){
  laporanPeriode=p;const today=new Date();let start,end;
  if(p==='harian'){start=end=today.toISOString().split('T')[0];}
  else if(p==='mingguan'){const d=new Date(today);d.setDate(d.getDate()-6);start=d.toISOString().split('T')[0];end=today.toISOString().split('T')[0];}
  else if(p==='bulanan'){start=new Date(today.getFullYear(),today.getMonth(),1).toISOString().split('T')[0];end=today.toISOString().split('T')[0];}
  else{start=end=null;}
  const se=document.getElementById('filterStart');const ee=document.getElementById('filterEnd');
  if(se)se.value=start||'';if(ee)ee.value=end||'';
  ['btn-lap-harian','btn-lap-mingguan','btn-lap-bulanan','btn-lap-semua'].forEach(id=>{const b=document.getElementById(id);if(!b)return;b.classList.remove('btn-primary-custom','btn-tab-active');b.classList.add('btn-outline-custom');});
  const ab=document.getElementById(`btn-lap-${p}`);if(ab){ab.classList.remove('btn-outline-custom');ab.classList.add('btn-primary-custom','btn-tab-active');}
  filterLaporan();
}
function filterLaporan(){
  const start=document.getElementById('filterStart')?.value;const end=document.getElementById('filterEnd')?.value;
  const locked=isSystemLocked();const role=getUserRole();const kasirOnly=role==='kasir';
  let f=transaksi.filter(t=>{
    if(start&&t.tanggal<start)return false;
    if(end&&t.tanggal>end)return false;
    // Kasir hanya lihat transaksi miliknya sendiri
    if(kasirOnly&&t.kasir!==currentUser?.username)return false;
    return true;
  });
  const tp=f.reduce((s,t)=>s+t.total,0);const tk=f.reduce((s,t)=>s+(t.snapItems||[]).reduce((sub,i)=>{const p=produk.find(x=>x.id===i.produk_id);return sub+(p?(p.harga_jual-p.harga_beli)*i.qty:0);},0),0);
  const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  s('lapTotalPenjualan',formatRp(tp));s('lapTotalTransaksi',f.length);s('lapTotalKeuntungan',formatRp(tk));
  // Update laporan subtitle dinamis untuk kasir
  const lapSubEl=document.getElementById('laporanSubtitle');
  if(lapSubEl){
    if(kasirOnly)lapSubEl.textContent=`Riwayat transaksi shift Anda (${currentUser?.username||''})`;
    else lapSubEl.textContent='Riwayat & analisis transaksi';
  }
  const mb={tunai:'green',qris:'blue',debit:'yellow'};const ml={tunai:'Tunai',qris:'QRIS',debit:'Debit'};
  const tbody=document.getElementById('laporanBody');if(!tbody)return;
  tbody.innerHTML=f.sort((a,b)=>b.tanggal.localeCompare(a.tanggal)).map(t=>{
    let aksiHtml='';
    if(locked){
      // Mode read-only (expired)
      aksiHtml='<span style="font-size:10px;color:var(--text-muted)">Read-Only</span>';
    } else if(kasirOnly){
      // Kasir: hanya bisa lihat struk, tidak bisa edit/hapus
      aksiHtml=`<button class="btn-tbl eye" onclick="lihatStrukLaporan(${t.id})" title="Lihat Struk"><i class="fa-solid fa-eye"></i></button>`;
    } else {
      // Admin: lihat struk saja (tidak ada edit/hapus transaksi selesai)
      aksiHtml=`<button class="btn-tbl eye" onclick="lihatStrukLaporan(${t.id})" title="Lihat Struk"><i class="fa-solid fa-eye"></i></button>`;
    }
    return`<tr><td>${formatTanggal(t.tanggal)}</td><td><code style="font-size:11px">${t.invoice}</code></td><td>${t.pelanggan}</td><td><strong>${formatRp(t.total)}</strong></td><td><span class="tag-badge ${mb[t.metode]||'blue'}">${ml[t.metode]||t.metode}</span></td><td>${t.kasir}</td><td>${aksiHtml}</td></tr>`;
  }).join('');
  destroyDT('laporan');
  try{dtLaporan=$('#tableLaporan').DataTable({language:{search:'Cari:',lengthMenu:'Tampilkan _MENU_ data',info:'Data _START_–_END_ dari _TOTAL_',paginate:{next:'›',previous:'‹'},zeroRecords:'Tidak ada data',infoEmpty:'Tidak ada data',infoFiltered:'(difilter dari _MAX_ total)'},order:[[0,'desc']],pageLength:10,destroy:true,columnDefs:[{orderable:false,targets:-1}]});}catch(e){console.warn('DT laporan:',e.message);}
}
function lihatStrukLaporan(id){
  const tx=transaksi.find(t=>t.id===id);if(!tx)return;
  if(!tx.snapItems||!tx.snapItems.length)tx.snapItems=(tx.items||[]).map(i=>{const p=produk.find(x=>x.id===i.produk_id);return{produk_id:i.produk_id,nama:p?p.nama:'Produk',harga:p?p.harga_jual:0,qty:i.qty,subtotal:(p?p.harga_jual:0)*i.qty};});
  document.getElementById('strukContent').innerHTML=buildStrukHtml(tx);new bootstrap.Modal(document.getElementById('modalStruk')).show();
}
function exportPDF(){
  const start=document.getElementById('filterStart').value;const end=document.getElementById('filterEnd').value;
  const kasirOnly=getUserRole()==='kasir';
  let f=transaksi.filter(t=>{
    if(start&&t.tanggal<start)return false;
    if(end&&t.tanggal>end)return false;
    if(kasirOnly&&t.kasir!==currentUser?.username)return false;
    return true;
  }).sort((a,b)=>b.tanggal.localeCompare(a.tanggal));
  const tp=f.reduce((s,t)=>s+t.total,0);const tk=f.reduce((s,t)=>s+(t.snapItems||[]).reduce((sub,i)=>{const p=produk.find(x=>x.id===i.produk_id);return sub+(p?(p.harga_jual-p.harga_beli)*i.qty:0);},0),0);
  const ml={tunai:'Tunai',qris:'QRIS',debit:'Debit'};
  const kasirOnlyExport=getUserRole()==='kasir';
  const ps=start||end?`${start?formatTanggal(start):'—'} s/d ${end?formatTanggal(end):'—'}`:'Semua Periode';
  const scopeLabel=kasirOnlyExport?` | Kasir: ${currentUser?.username||''}`:'';
  const rows=f.map((t,i)=>`<tr><td style="text-align:center">${i+1}</td><td>${formatTanggal(t.tanggal)}${t.waktu?`<br><span style="font-size:10px;color:#555">${t.waktu}</span>`:''}</td><td style="font-family:monospace;font-size:11px">${t.invoice}</td><td>${t.pelanggan}</td><td style="text-align:right;font-weight:600">${formatRp(t.total)}</td><td style="text-align:center">${ml[t.metode]||t.metode}</td><td>${t.kasir}</td></tr>`).join('');
  const lh=settings.logo?`<img src="${settings.logo}" style="width:56px;height:56px;object-fit:cover;border-radius:8px;margin-bottom:8px;"/>`:'';
  const html=`<!DOCTYPE html><html lang="id"><head><meta charset="UTF-8"/><title>Laporan${scopeLabel} — ${settings.namaUsaha}</title><style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Arial,sans-serif;color:#000;background:white;padding:12mm;}.header{text-align:center;margin-bottom:16px;padding-bottom:12px;border-bottom:3px solid #000;}h1{font-size:20px;font-weight:900;text-transform:uppercase;letter-spacing:1px;}.sub{font-size:13px;color:#333;font-weight:700;margin:2px 0;}.per{font-size:11px;color:#333;margin-top:2px;}.summary{display:flex;gap:10px;margin-bottom:14px;}.sc{flex:1;border:2px solid #000;border-radius:6px;padding:10px 12px;}.sc-l{font-size:10px;color:#333;font-weight:700;text-transform:uppercase;}.sc-v{font-size:17px;font-weight:900;color:#000;margin-top:3px;}table{width:100%;border-collapse:collapse;font-size:11px;}thead tr th{background:#000;color:#fff;padding:7px 8px;text-align:left;font-size:10px;text-transform:uppercase;}tbody tr td{padding:6px 8px;border-bottom:1px solid #ccc;}tbody tr:nth-child(even) td{background:#f5f5f5;}.footer{text-align:center;font-size:10px;color:#555;margin-top:14px;padding-top:8px;border-top:1px solid #ccc;}@page{margin:8mm;size:A4;}</style></head><body><div class="header">${lh}<h1>${settings.namaUsaha}</h1><div class="sub">LAPORAN PENJUALAN</div><div class="per">Periode: ${ps}${scopeLabel?'<br>'+scopeLabel:''}</div><div class="per">Dicetak: ${new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>${settings.alamat?`<div class="per">${settings.alamat}${settings.telp?' | Telp: '+settings.telp:''}</div>`:''}</div><div class="summary"><div class="sc"><div class="sc-l">Total Penjualan</div><div class="sc-v">${formatRp(tp)}</div></div><div class="sc"><div class="sc-l">Jumlah Transaksi</div><div class="sc-v">${f.length} transaksi</div></div><div class="sc"><div class="sc-l">Total Keuntungan</div><div class="sc-v">${formatRp(tk)}</div></div></div><table><thead><tr><th>#</th><th>Tanggal</th><th>Invoice</th><th>Pelanggan</th><th style="text-align:right">Total</th><th style="text-align:center">Metode</th><th>Kasir</th></tr></thead><tbody>${rows}</tbody></table><div class="footer">KasirGO — ${settings.namaUsaha} | Total ${f.length} transaksi</div><script>window.onload=function(){window.print()}<\/script></body></html>`;
  const w=window.open('','_blank');if(!w){showToast('Izinkan popup!','warning');return;}w.document.write(html);w.document.close();showToast('Laporan PDF siap dicetak! 📄','success');
}

// ── PENGATURAN ──
function uploadLogo(input){if(input.files&&input.files[0]){const r=new FileReader();r.onload=e=>{settings.logo=e.target.result;document.getElementById('logoPreviewWrap').innerHTML=`<img src="${settings.logo}" style="width:72px;height:72px;object-fit:cover;border-radius:12px;display:block;margin:0 auto 4px"/><div style="font-size:11px;color:var(--text-muted);text-align:center">Klik untuk ganti logo</div>`;applyBranding();};r.readAsDataURL(input.files[0]);}}
function simpanPengaturan(){
  settings.namaUsaha=document.getElementById('settNamaUsaha').value.trim();settings.alamat=document.getElementById('settAlamat').value.trim();settings.telp=document.getElementById('settTelp').value.trim();settings.ppn=parseFloat(document.getElementById('settPpn').value)||11;settings.ppnAktif=document.getElementById('settPpnAktif').checked;settings.header=document.getElementById('settHeader').value.trim();settings.footer=document.getElementById('settFooter').value.trim();
  if(currentUser){const acc=accounts.find(a=>a.username===currentUser.username);if(acc){acc.namaUsaha=settings.namaUsaha;acc.logo=settings.logo;acc.alamat=settings.alamat;acc.telp=settings.telp;currentUser.namaUsaha=settings.namaUsaha;LS.set('kg_currentUser',currentUser);LS.set('kg_accounts',accounts);}}
  saveData();applyBranding();showToast('Pengaturan berhasil disimpan! ✅','success');
}
function gantiPassword(){
  const op=document.getElementById('settOldPwd').value;const np=document.getElementById('settNewPwd').value;
  if(!op||!np){showToast('Isi semua field password!','error');return;}if(np.length<6){showToast('Password baru minimal 6 karakter!','error');return;}
  const acc=accounts.find(a=>a.username===currentUser?.username);if(!acc||acc.password!==op){showToast('Password lama salah!','error');return;}
  acc.password=np;LS.set('kg_accounts',accounts);document.getElementById('settOldPwd').value='';document.getElementById('settNewPwd').value='';showToast('Password berhasil diubah!','success');
}

// ── HUTANG / PIUTANG (REAL-TIME + RSVP) ──
function renderHutangPage(){
  const today=new Date().toISOString().split('T')[0];
  const aktif=hutangPiutang.filter(h=>h.status==='aktif');const lunas=hutangPiutang.filter(h=>h.status==='lunas');
  const tH=aktif.filter(h=>h.jenis==='hutang').reduce((s,h)=>s+h.sisa,0);
  const tP=aktif.filter(h=>h.jenis==='piutang').reduce((s,h)=>s+h.sisa,0);
  const jt=aktif.filter(h=>h.jatuhTempo&&h.jatuhTempo<=today).length;
  const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  s('statHutangTotal',formatRp(tH));s('statPiutangTotal',formatRp(tP));s('statJatuhTempo',jt);s('statLunas',lunas.length);
  renderHutangTable();
}
function filterHutang(filter,elBtn){
  hutangFilter=filter;
  ['tabSemua','tabHutang','tabPiutang','tabJT'].forEach(id=>{const b=document.getElementById(id);if(!b)return;b.classList.remove('btn-primary-custom','btn-tab-active');b.classList.add('btn-outline-custom');});
  if(elBtn){elBtn.classList.remove('btn-outline-custom');elBtn.classList.add('btn-primary-custom','btn-tab-active');}
  renderHutangTable();
}
function renderHutangTable(){
  const today=new Date().toISOString().split('T')[0];
  const q=(document.getElementById('searchHutang')?.value||'').toLowerCase();
  const list=hutangPiutang.filter(h=>{
    if(q&&!h.nama.toLowerCase().includes(q))return false;
    if(hutangFilter==='hutang')return h.jenis==='hutang'&&h.status==='aktif';
    if(hutangFilter==='piutang')return h.jenis==='piutang'&&h.status==='aktif';
    if(hutangFilter==='jatuh_tempo')return h.status==='aktif'&&h.jatuhTempo&&h.jatuhTempo<=today;
    return true;
  }).sort((a,b)=>b.tglCatat.localeCompare(a.tglCatat));
  const tbody=document.getElementById('hutangBody');if(!tbody)return;
  if(!list.length){tbody.innerHTML=`<tr><td colspan="9" style="text-align:center;padding:28px;color:var(--text-muted)"><i class="fa-solid fa-inbox" style="font-size:28px;margin-bottom:8px;display:block;opacity:.3"></i>Tidak ada data</td></tr>`;return;}
  tbody.innerHTML=list.map(h=>{
    const isJT=h.status==='aktif'&&h.jatuhTempo&&h.jatuhTempo<=today;
    const sb=h.status==='lunas'?`<span class="hp-badge lunas">✅ Lunas</span>`:isJT?`<span class="hp-badge jatuh-tempo">⚠️ Jatuh Tempo</span>`:`<span class="hp-badge" style="background:var(--primary-light);color:var(--primary)">🔵 Aktif</span>`;
    const jb=h.jenis==='hutang'?`<span class="hp-badge hutang">💸 Hutang</span>`:`<span class="hp-badge piutang">💰 Piutang</span>`;
    return`<tr><td><strong>${h.nama}</strong>${h.telp?`<br><small style="color:var(--text-muted)">${h.telp}</small>`:''}</td><td>${jb}</td><td>${formatRp(h.jumlah)}</td><td><strong style="color:${h.sisa>0?'var(--red)':'var(--green)'}">${formatRp(h.sisa)}</strong></td><td>${formatTanggal(h.tglCatat)}</td><td>${h.jatuhTempo?`<span style="color:${isJT?'var(--red)':'var(--text)'}">${formatTanggal(h.jatuhTempo)}</span>`:'—'}</td><td>${sb}</td><td style="font-size:11px;color:var(--text-muted);max-width:140px">${h.keterangan||'—'}</td><td>${h.status==='aktif'?`<button class="btn-tbl edit" onclick="bayarSebagian(${h.id})" title="Bayar/Cicil"><i class="fa-solid fa-money-bill-wave"></i></button><button class="btn-tbl eye" onclick="lunasHutang(${h.id})" title="Lunas"><i class="fa-solid fa-check"></i></button><button class="btn-tbl" onclick="rsvpHutang(${h.id})" title="RSVP WA" style="background:var(--green-light);color:var(--green);border:1px solid var(--green)"><i class="fa-brands fa-whatsapp"></i></button>`:''}<button class="btn-tbl edit" onclick="openModalHutang(${h.id})" title="Edit"><i class="fa-solid fa-pen"></i></button><button class="btn-tbl delete" onclick="hapusHutang(${h.id})" title="Hapus"><i class="fa-solid fa-trash"></i></button></td></tr>`;
  }).join('');
}

// RSVP WhatsApp
function rsvpHutang(id){
  const h=hutangPiutang.find(x=>x.id===id);if(!h)return;
  const today=new Date().toISOString().split('T')[0];const isOv=h.jatuhTempo&&h.jatuhTempo<=today;
  const tJT=h.jatuhTempo?formatTanggal(h.jatuhTempo):'(tidak ditentukan)';
  const msg=`Halo ${h.nama},%0A%0AKami dari *${settings.namaUsaha}* mengingatkan mengenai ${h.jenis==='hutang'?'tagihan hutang':'piutang'}:%0A%0A📋 *Detail Tagihan:*%0A• Jumlah Awal  : ${formatRp(h.jumlah)}%0A• Sisa Tagihan : *${formatRp(h.sisa)}*%0A• Jatuh Tempo  : ${tJT}%0A• Keterangan   : ${h.keterangan||'-'}%0A%0A${isOv?'⚠️ *Tagihan sudah JATUH TEMPO. Mohon segera bayar.*':'⏰ Mohon lakukan pembayaran sebelum jatuh tempo.'}%0A%0ATerima kasih 🙏%0A*${settings.namaUsaha}*`;
  const phone=h.telp?h.telp.replace(/^0/,'62').replace(/[\s-]/g,''):'';
  const waUrl=phone?`https://wa.me/${phone}?text=${msg}`:`https://wa.me/?text=${msg}`;
  Swal.fire({title:`📱 RSVP Pengingat — ${h.nama}`,html:`<div style="text-align:left;margin:8px 0"><div style="font-size:12px;color:#7c8fa6;margin-bottom:8px">Preview pesan WhatsApp:</div><div style="background:#f0f4f9;border-radius:8px;padding:12px;font-size:12px;white-space:pre-line;border-left:3px solid #25d366">Halo ${h.nama},\n\nKami dari *${settings.namaUsaha}* mengingatkan mengenai ${h.jenis==='hutang'?'tagihan hutang':'piutang'}:\n\n📋 *Detail Tagihan:*\n• Jumlah Awal  : ${formatRp(h.jumlah)}\n• Sisa Tagihan : *${formatRp(h.sisa)}*\n• Jatuh Tempo  : ${tJT}\n• Keterangan   : ${h.keterangan||'-'}\n\n${isOv?'⚠️ Tagihan sudah JATUH TEMPO.':'⏰ Mohon bayar sebelum jatuh tempo.'}\n\nTerima kasih 🙏\n*${settings.namaUsaha}*</div>${!phone?'<div style="color:#ea5455;font-size:11px;margin-top:8px">⚠️ Nomor HP tidak tersedia.</div>':''}</div>`,showCancelButton:true,confirmButtonColor:'#25d366',confirmButtonText:'<i class="fa-brands fa-whatsapp me-2"></i>Kirim via WhatsApp',cancelButtonText:'Tutup',cancelButtonColor:'#aaa'}).then(r=>{if(r.isConfirmed)window.open(waUrl,'_blank');});
}

function openModalHutang(id=null){
  editHutangId=id;document.getElementById('modalHutangTitle').textContent=id?'Edit Catatan':'Catat Hutang / Piutang';
  const today=new Date().toISOString().split('T')[0];
  if(id){const h=hutangPiutang.find(x=>x.id===id);document.getElementById('hJenis').value=h.jenis;document.getElementById('hNama').value=h.nama;document.getElementById('hTelp').value=h.telp||'';document.getElementById('hJumlah').value=h.jumlah;document.getElementById('hTanggal').value=h.tglCatat;document.getElementById('hJatuhTempo').value=h.jatuhTempo||'';document.getElementById('hKeterangan').value=h.keterangan||'';}
  else{document.getElementById('hJenis').value='hutang';document.getElementById('hNama').value='';document.getElementById('hTelp').value='';document.getElementById('hJumlah').value='';document.getElementById('hTanggal').value=today;document.getElementById('hJatuhTempo').value='';document.getElementById('hKeterangan').value='';}
  new bootstrap.Modal(document.getElementById('modalHutang')).show();
}
function simpanHutang(){
  const nama=document.getElementById('hNama').value.trim();const jenis=document.getElementById('hJenis').value;
  const jumlah=parseFloat(document.getElementById('hJumlah').value)||0;const tanggal=document.getElementById('hTanggal').value;
  if(!nama){showToast('Nama wajib diisi!','error');return;}if(!jumlah){showToast('Jumlah wajib diisi!','error');return;}if(!tanggal){showToast('Tanggal wajib diisi!','error');return;}
  const data={jenis,nama,telp:document.getElementById('hTelp').value.trim(),jumlah,tglCatat:tanggal,jatuhTempo:document.getElementById('hJatuhTempo').value||null,keterangan:document.getElementById('hKeterangan').value.trim()};
  if(editHutangId){const i=hutangPiutang.findIndex(h=>h.id===editHutangId);hutangPiutang[i]={...hutangPiutang[i],...data};showToast('Catatan diperbarui!','success');}
  else{hutangPiutang.push({id:Date.now(),...data,status:'aktif',sisa:jumlah});showToast(`${jenis==='hutang'?'Hutang':'Piutang'} "${nama}" dicatat!`,'success');}
  saveData();renderHutangPage();bootstrap.Modal.getInstance(document.getElementById('modalHutang')).hide();
}
function bayarSebagian(id){
  const h=hutangPiutang.find(x=>x.id===id);
  Swal.fire({title:`💳 Bayar — ${h.nama}`,html:`<div style="margin:8px 0"><div style="font-size:12px;color:#7c8fa6;margin-bottom:6px">Sisa tagihan:</div><div style="font-size:22px;font-weight:800;color:#ea5455;margin-bottom:12px">${formatRp(h.sisa)}</div><input type="number" id="swalBayarNom" class="swal2-input" placeholder="Jumlah yang dibayar" max="${h.sisa}" min="1"/></div>`,showCancelButton:true,confirmButtonColor:'#28c76f',confirmButtonText:'✅ Konfirmasi Bayar',cancelButtonText:'Batal',cancelButtonColor:'#aaa',preConfirm:()=>{const v=parseFloat(document.getElementById('swalBayarNom').value)||0;if(!v||v<=0){Swal.showValidationMessage('Masukkan jumlah bayar!');return false;}if(v>h.sisa){Swal.showValidationMessage('Melebihi sisa hutang!');return false;}return v;}})
  .then(r=>{if(r.isConfirmed){h.sisa-=r.value;if(h.sisa<=0){h.sisa=0;h.status='lunas';showToast(`✅ ${h.nama} LUNAS!`,'success');}else showToast(`Bayar ${formatRp(r.value)} — sisa ${formatRp(h.sisa)}`,'info');saveData();renderHutangPage();}});
}
function lunasHutang(id){
  const h=hutangPiutang.find(x=>x.id===id);
  Swal.fire({title:'Tandai Lunas?',html:`<b>${h.nama}</b><br><span style="color:#ea5455">${formatRp(h.sisa)}</span> dianggap telah dibayar penuh.`,icon:'question',showCancelButton:true,confirmButtonColor:'#28c76f',cancelButtonColor:'#aaa',confirmButtonText:'✅ Ya, Lunas',cancelButtonText:'Batal'})
  .then(r=>{if(r.isConfirmed){h.status='lunas';h.sisa=0;saveData();renderHutangPage();showToast(`✅ ${h.nama} telah lunas!`,'success');}});
}
function hapusHutang(id){
  const h=hutangPiutang.find(x=>x.id===id);
  Swal.fire({title:'Hapus Catatan?',html:`<b>${h.nama}</b> akan dihapus permanen.`,icon:'warning',showCancelButton:true,confirmButtonColor:'#ea5455',cancelButtonColor:'#aaa',confirmButtonText:'Hapus',cancelButtonText:'Batal'})
  .then(r=>{if(r.isConfirmed){hutangPiutang=hutangPiutang.filter(x=>x.id!==id);saveData();renderHutangPage();showToast('Catatan dihapus.','info');}});
}

// ── MANAJEMEN KASIR + SHIFT ──
function renderKasirPage(){
  const role=getUserRole();const isAdm=role==='admin'||isSuperAdmin();
  const today=new Date().toISOString().split('T')[0];const kasir=currentUser?.username||'admin';
  const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  s('kasirAktifNama',kasir);
  const av=document.getElementById('kasirAktifAvatar');if(av)av.textContent=kasir[0].toUpperCase();
  const acc=accounts.find(a=>a.username===kasir);
  s('kasirAktifRole',(acc?.role==='admin'||isSuperAdmin())?'👑 Admin':'🖥️ Kasir');
  if(!shiftStartTime){shiftStartTime=new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'});LS.set('kg_shiftStart',shiftStartTime);}
  s('shiftMulai',shiftStartTime);
  const stx=transaksi.filter(t=>t.tanggal===today&&t.kasir===kasir);
  s('shiftTransaksi',stx.length);s('shiftPenjualan',formatRp(stx.reduce((sm,t)=>sm+t.total,0)));
  const smEl=document.getElementById('shiftManagement');if(smEl)smEl.style.display=isAdm?'':'none';
  const tbody=document.getElementById('kasirBody');if(!tbody)return;
  tbody.innerHTML=accounts.map(a=>{
    const isMe=a.username===kasir;const ar=a.role||'admin';
    const sf=LS.get(`kg_shift_${a.username}`,null);
    return`<tr><td><div class="user-avatar" style="width:34px;height:34px;font-size:13px">${a.username[0].toUpperCase()}</div></td><td><strong>${a.username}</strong>${isMe?'<span class="badge-custom green ms-1" style="font-size:10px">Anda</span>':''}</td><td>${a.namaUsaha||'—'}</td><td><span class="role-badge ${ar}">${ar==='admin'?'👑 Admin':'🖥️ Kasir'}</span></td><td>${sf?`<span class="badge-custom blue">${sf.mulai} – ${sf.selesai}</span>`:'<span style="font-size:11px;color:var(--text-muted)">Belum diatur</span>'}</td><td><span class="badge-custom ${isMe?'green':'blue'}" style="font-size:10px">${isMe?'● Login':'Terdaftar'}</span></td><td>${isAdm?`<button class="btn-tbl edit" onclick="gantiRoleKasir('${a.username}')" title="Ganti Role"><i class="fa-solid fa-user-gear"></i></button><button class="btn-tbl eye" onclick="aturShiftKasir('${a.username}')" title="Atur Shift"><i class="fa-solid fa-clock"></i></button>${!isMe?`<button class="btn-tbl delete" onclick="hapusKasir('${a.username}')" title="Hapus"><i class="fa-solid fa-trash"></i></button>`:''}`:''}  </td></tr>`;
  }).join('');
}

function aturShiftKasir(username){
  const ex=LS.get(`kg_shift_${username}`,{mulai:'08:00',selesai:'16:00'});
  Swal.fire({title:`⏰ Atur Shift — ${username}`,html:`<div style="display:flex;gap:16px;justify-content:center;margin:12px 0"><div><label style="font-size:12px;color:#7c8fa6;display:block;margin-bottom:4px">Jam Mulai</label><input type="time" id="shiftMIn" class="swal2-input" style="width:130px" value="${ex.mulai}"/></div><div><label style="font-size:12px;color:#7c8fa6;display:block;margin-bottom:4px">Jam Selesai</label><input type="time" id="shiftSIn" class="swal2-input" style="width:130px" value="${ex.selesai}"/></div></div>`,showCancelButton:true,confirmButtonColor:'#4a90e2',confirmButtonText:'💾 Simpan Shift',cancelButtonText:'Batal',cancelButtonColor:'#aaa',preConfirm:()=>{const m=document.getElementById('shiftMIn').value;const s=document.getElementById('shiftSIn').value;if(!m||!s){Swal.showValidationMessage('Isi jam mulai dan selesai!');return false;}return{mulai:m,selesai:s};}})
  .then(r=>{if(r.isConfirmed){LS.set(`kg_shift_${username}`,r.value);showToast(`Shift ${username}: ${r.value.mulai} – ${r.value.selesai}`,'success');renderKasirPage();}});
}

function openModalKasir(){
  ['kasirNamaUsaha','kasirUsername','kasirPassword'].forEach(id=>{document.getElementById(id).value='';});
  document.getElementById('kasirRole').value='kasir';
  new bootstrap.Modal(document.getElementById('modalKasir')).show();
}
function simpanKasirBaru(){
  const nu=document.getElementById('kasirNamaUsaha').value.trim();const u=document.getElementById('kasirUsername').value.trim();const p=document.getElementById('kasirPassword').value;const r=document.getElementById('kasirRole').value;
  if(!nu){showToast('Nama usaha wajib!','error');return;}if(!u){showToast('Username wajib!','error');return;}if(p.length<6){showToast('Password minimal 6 karakter!','error');return;}
  if(accounts.find(a=>a.username===u)){showToast('Username sudah digunakan!','error');return;}
  const adminAcc=accounts.find(a=>a.username===currentUser.username);
  accounts.push({username:u,password:p,namaUsaha:nu,logo:'',alamat:'',telp:'',role:r,trial_start_date:adminAcc?.trial_start_date||new Date().toISOString().split('T')[0],subscription_status:adminAcc?.subscription_status||'trial',expiry_date:adminAcc?.expiry_date||''});
  LS.set('kg_accounts',accounts);bootstrap.Modal.getInstance(document.getElementById('modalKasir')).hide();showToast(`Kasir "${u}" berhasil ditambahkan!`,'success');renderKasirPage();
}
function hapusKasir(username){
  Swal.fire({title:'Hapus Kasir?',html:`Akun <b>${username}</b> akan dihapus permanen.`,icon:'warning',showCancelButton:true,confirmButtonColor:'#ea5455',cancelButtonColor:'#aaa',confirmButtonText:'Hapus',cancelButtonText:'Batal'})
  .then(r=>{if(r.isConfirmed){accounts=accounts.filter(a=>a.username!==username);LS.set('kg_accounts',accounts);showToast(`Kasir "${username}" dihapus.`,'info');renderKasirPage();}});
}
function gantiRoleKasir(username){
  const acc=accounts.find(a=>a.username===username);if(!acc)return;const nr=acc.role==='admin'?'kasir':'admin';
  Swal.fire({title:'Ganti Role?',html:`Ubah <b>${username}</b> menjadi <b>${nr==='admin'?'👑 Admin':'🖥️ Kasir'}</b>?`,icon:'question',showCancelButton:true,confirmButtonColor:'#4a90e2',cancelButtonColor:'#aaa',confirmButtonText:'Ya, Ubah',cancelButtonText:'Batal'})
  .then(r=>{if(r.isConfirmed){acc.role=nr;LS.set('kg_accounts',accounts);showToast(`Role ${username} → ${nr}`,'success');renderKasirPage();}});
}

// ── HALAMAN LANGGANAN ──
function renderLanggananPage(){
  const el=document.getElementById('langgananContent');if(!el)return;
  const locked=isSystemLocked();
  const sub=currentUser&&!isSuperAdmin()?getAccountSubscription(currentUser.username):null;
  let statusHtml='';
  if(sub){
    const c=sub.isExpired?'#ea5455':sub.daysLeft<=7?'#f59e0b':'#28c76f';
    const t=sub.isExpired?'🔒 EXPIRED':sub.status==='trial'?'🎁 Free Trial':'✅ Aktif';
    statusHtml=`<div class="stat-card mb-3"><div class="stat-icon ${sub.isExpired?'red':sub.status==='trial'?'yellow':'green'}"><i class="fa-solid fa-key"></i></div><div class="stat-label">Status Langganan</div><div class="stat-value" style="color:${c}">${t}</div><div class="stat-change ${sub.isExpired?'down':'up'}">${sub.isExpired?'⛔ Sistem terkunci':`Berlaku hingga: ${formatTanggal(sub.expiry)}`}</div></div>
    <div class="stat-card mb-3"><div class="stat-icon ${sub.daysLeft<=7?'red':'blue'}"><i class="fa-solid fa-calendar-days"></i></div><div class="stat-label">Sisa Masa Aktif</div><div class="stat-value ${sub.daysLeft<=7?'text-danger':''}">${Math.max(0,sub.daysLeft)} Hari</div><div class="stat-change neutral">Dari tanggal berlaku</div></div>`;
  }
  const lockHtml=locked?`<div class="alert" style="background:#fff3cd;border:1px solid #ffc107;border-radius:12px;padding:16px;margin-bottom:20px"><h6 style="color:#856404;margin-bottom:8px"><i class="fa-solid fa-lock me-2"></i>Sistem Terkunci</h6><p style="font-size:13px;color:#664d03;margin:0">Masa aktif akun Anda telah habis. Input transaksi baru tidak dapat dilakukan. Masukkan Kode Referensi untuk mengaktifkan kembali.</p></div>`:'';
  el.innerHTML=`<div class="row g-3 mb-4"><div class="col-12 col-md-5">${statusHtml}</div><div class="col-12 col-md-7">
    <div class="card-custom mb-3"><div class="card-custom-header"><h6 class="card-custom-title"><i class="fa-solid fa-credit-card me-2"></i>Informasi Pembayaran</h6></div><div style="font-size:13px;line-height:1.9"><p>Transfer ke rekening berikut untuk memperpanjang langganan:</p><div style="background:var(--bg-soft);border-radius:8px;padding:12px;margin:10px 0"><div><strong>Bank BCA</strong> — No. Rek: <strong>1234-5678-90</strong></div><div>Atas Nama: <strong>KasirGO Indonesia</strong></div></div><div style="background:var(--bg-soft);border-radius:8px;padding:12px;margin:10px 0"><strong>Tarif:</strong><br>• 30 Hari: <strong>Rp 99.000</strong> &nbsp;• 90 Hari: <strong>Rp 249.000</strong> &nbsp;• 360 Hari: <strong>Rp 799.000</strong></div><p style="font-size:11px;color:var(--text-muted)">Setelah bayar, hubungi Admin KasirGO untuk mendapat Kode Referensi.</p></div></div>
  </div></div>
  ${lockHtml}
  <div class="card-custom"><div class="card-custom-header"><h6 class="card-custom-title"><i class="fa-solid fa-key me-2"></i>Aktivasi Kode Referensi</h6></div><p style="font-size:13px;color:var(--text-muted);margin-bottom:16px">Masukkan Kode Referensi / Serial Number dari Admin KasirGO setelah pembayaran dikonfirmasi.</p><div style="display:flex;gap:8px"><div class="input-icon-wrap" style="flex:1"><i class="fa-solid fa-key"></i><input type="text" class="form-control form-control-custom" id="licenseCodeInput" placeholder="Contoh: ABCD-EFGH-IJKL-MNOP" style="text-transform:uppercase;letter-spacing:2px;font-weight:600" oninput="this.value=this.value.toUpperCase()"/></div><button class="btn btn-primary-custom" onclick="activateLicense(document.getElementById('licenseCodeInput').value)"><i class="fa-solid fa-unlock me-2"></i>Aktifkan</button></div></div>`;
}

// ── SUPER ADMIN PANEL ──
function renderSuperAdminPage(){
  const el=document.getElementById('superAdminContent');if(!el)return;
  const allCodes=LS.get('kg_license_codes',[]);
  const codesHtml=allCodes.length?allCodes.map(c=>`<tr><td><code style="font-size:12px;letter-spacing:1px">${c.code}</code></td><td><span class="tag-badge blue">${c.days} hari</span></td><td>${formatTanggal(c.created_at)}</td><td>${c.used?`<span class="tag-badge green">✅ Digunakan</span><br><small style="font-size:10px;color:var(--text-muted)">${c.used_by||''} — ${c.used_at||''}</small>`:`<span class="tag-badge yellow">⏳ Belum</span>`}</td></tr>`).join(''):`<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:20px">Belum ada kode</td></tr>`;
  const accHtml=accounts.map(a=>{const sub=getAccountSubscription(a.username);const c=!sub||sub.isExpired?'#ea5455':sub.daysLeft<=7?'#f59e0b':'#28c76f';return`<tr><td><strong>${a.username}</strong></td><td>${a.namaUsaha}</td><td><span class="role-badge ${a.role}">${a.role}</span></td><td><span style="color:${c};font-weight:600">${sub?(sub.isExpired?'EXPIRED':sub.status+' — '+sub.daysLeft+'h'):'—'}</span></td><td>${a.expiry_date?formatTanggal(a.expiry_date):'—'}</td></tr>`;}).join('');
  el.innerHTML=`<div class="row g-3 mb-4"><div class="col-12 col-lg-6"><div class="card-custom"><div class="card-custom-header"><h6 class="card-custom-title"><i class="fa-solid fa-wand-magic-sparkles me-2"></i>Generate Kode Lisensi</h6></div><p style="font-size:13px;color:var(--text-muted)">Buat kode aktivasi unik untuk diberikan kepada pelanggan.</p><div class="mb-3"><label class="form-label-custom">Pilih Durasi Paket</label><select class="form-select form-select-custom" id="licDuration"><option value="30">📅 30 Hari — Rp 99.000</option><option value="90">📅 90 Hari — Rp 249.000</option><option value="360">📅 360 Hari — Rp 799.000</option></select></div><button class="btn btn-primary-custom w-100" onclick="doGenerateCode()"><i class="fa-solid fa-key me-2"></i>Generate Kode Baru</button><div id="generatedCodeResult" style="display:none;margin-top:16px;background:var(--bg-soft);border-radius:10px;padding:16px;text-align:center"><div style="font-size:11px;color:var(--text-muted);margin-bottom:6px">Kode Lisensi Baru:</div><div id="generatedCodeText" style="font-size:20px;font-weight:800;letter-spacing:3px;color:var(--primary);font-family:'DM Mono',monospace"></div><div id="generatedCodeDays" style="font-size:12px;color:var(--text-muted);margin-top:4px"></div><button onclick="copyGeneratedCode()" class="btn btn-secondary-custom btn-sm mt-2"><i class="fa-solid fa-copy me-1"></i>Salin Kode</button></div></div></div>
  <div class="col-12 col-lg-6"><div class="card-custom"><div class="card-custom-header"><h6 class="card-custom-title"><i class="fa-solid fa-users me-2"></i>Monitor Akun Toko</h6></div><div class="table-responsive"><table class="table table-custom"><thead><tr><th>Username</th><th>Toko</th><th>Role</th><th>Status</th><th>Exp.</th></tr></thead><tbody>${accHtml}</tbody></table></div></div></div></div>
  <div class="card-custom"><div class="card-custom-header"><h6 class="card-custom-title"><i class="fa-solid fa-list me-2"></i>Riwayat Kode Lisensi</h6><span class="badge-custom blue">${allCodes.length}</span></div><div class="table-responsive"><table class="table table-custom"><thead><tr><th>Kode</th><th>Durasi</th><th>Dibuat</th><th>Status</th></tr></thead><tbody>${codesHtml}</tbody></table></div></div>`;
}

function doGenerateCode(){
  const days=parseInt(document.getElementById('licDuration').value);
  _lastGeneratedCode=generateLicenseCode(days);
  document.getElementById('generatedCodeText').textContent=_lastGeneratedCode;
  document.getElementById('generatedCodeDays').textContent=`Berlaku ${days} hari`;
  document.getElementById('generatedCodeResult').style.display='';
  renderSuperAdminPage();
  // Restore result area after re-render
  setTimeout(()=>{const r=document.getElementById('generatedCodeResult');const t=document.getElementById('generatedCodeText');const d=document.getElementById('generatedCodeDays');if(r&&t&&d){r.style.display='';t.textContent=_lastGeneratedCode;d.textContent=`Berlaku ${days} hari`;}},50);
  showToast(`Kode ${_lastGeneratedCode} berhasil digenerate!`,'success');
}
function copyGeneratedCode(){const code=document.getElementById('generatedCodeText')?.textContent;if(!code)return;navigator.clipboard.writeText(code).then(()=>showToast('Kode disalin!','success')).catch(()=>showToast('Gagal menyalin.','error'));}

// ── ENTRY POINT ──
document.addEventListener('DOMContentLoaded',()=>{
  if(currentUser){showApp();if(isSystemLocked())showLockedScreen();}
  else{document.getElementById('authWrapper').style.display='';document.getElementById('appWrapper').style.display='none';applyBranding();}
});
