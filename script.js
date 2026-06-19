// script.js
const versions = {
  'v1.0': { name: 'Client v1.0', url: 'https://github.com/sourcerfree/sourcerfreeclient/raw/refs/heads/main/SourcerFree.exe', filename: 'SourcerFreeInstaller-v1.0.exe' },
  'v2.0': { name: 'Client v2.0', url: 'https://github.com/sourcerfree/sourcerfreeclient/raw/refs/heads/main/SourcerFree.exe', filename: 'SourcerFreeInstaller-v2.0.exe' },
  'v3.0': { name: 'Client v3.0', url: 'https://github.com/sourcerfree/sourcerfreeclient/raw/refs/heads/main/SourcerFree.exe', filename: 'SourcerFreeInstaller-v3.0.exe' },
  'v4.0': { name: 'Client v4.0', url: 'https://github.com/sourcerfree/sourcerfreeclient/raw/refs/heads/main/SourcerFree.exe', filename: 'SourcerFreeInstaller-v4.0.exe' },
  'v5.0': { name: 'Client v5.0', url: 'https://github.com/sourcerfree/sourcerfreeclient/raw/refs/heads/main/SourcerFree.exe', filename: 'SourcerFreeInstaller-v5.0.exe' }
};

document.addEventListener('DOMContentLoaded',()=>{
  // tabs
  document.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(s=>s.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.dataset.target;
      document.getElementById(t).classList.add('active');
    });
  });

  const downloadBtn = document.getElementById('downloadBtn');
  const modal = document.getElementById('modal');
  const versionModal = document.getElementById('versionModal');
  const modalText = document.getElementById('modalText');

  function showModal(text){
    modalText.textContent = text;
    modal.classList.remove('hidden');
  }
  function hideModal(){
    modal.classList.add('hidden');
  }
  function showVersionModal(){
    const versionList = document.getElementById('versionList');
    versionList.innerHTML = '';
    Object.entries(versions).forEach(([key, v])=>{
      const btn = document.createElement('button');
      btn.className = 'version-btn';
      btn.textContent = v.name;
      btn.onclick = ()=>downloadVersion(key);
      versionList.appendChild(btn);
    });
    versionModal.classList.remove('hidden');
  }

  async function downloadVersion(versionKey){
    versionModal.classList.add('hidden');
    const v = versions[versionKey];
    showModal('Iniciando download...');
    try{
      const res = await fetch(v.url);
      if(!res.ok) throw new Error('Resposta inválida: '+res.status);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = v.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
      modalText.textContent = 'Download iniciado.';
      setTimeout(hideModal,1200);
    }catch(err){
      modalText.textContent = 'Erro ao baixar: '+err.message;
      setTimeout(hideModal,2500);
    }
  }

  downloadBtn.addEventListener('click',()=>{
    showVersionModal();
  });
});
