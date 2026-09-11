import React, { useState } from 'react';
import './TeamSection.css';

const teamMembers = [
  {
    id: 'team-azalea',
    name: 'Azalea Serafina',
    role: 'Project Leader',
    cardImg: '/azalea-card.png',
    isLecturer: false,
    bio: 'Mahasiswa IPB University. Bertanggung jawab memimpin jalannya proyek Modul Digital Pedal Juara, mengordinasikan seluruh tim, serta memastikan setiap tahapan program berjalan efektif, terstruktur, dan memberikan dampak positif yang nyata.',
    prodi: 'Departemen Ilmu Keluarga dan Konsumen - IPB',
  },
  {
    id: 'team-amalia',
    name: 'Resky Amalia',
    role: 'Media Creative',
    cardImg: '/amalia-card.png',
    isLecturer: false,
    bio: 'Mahasiswa Institut Pertanian Bogor. Berperan dalam merancang identitas visual, visual grafis, ilustrasi interaktif, serta desain media pembelajaran digital yang menarik dan mengedukasi anak-anak.',
    prodi: 'Departemen Komunikasi Digital dan Media - Institut Pertanian Bogor',
  },
  {
    id: 'team-fazza',
    name: 'Muhammad Fazza',
    role: 'Treasurer & Operational',
    cardImg: '/fazza-card.png',
    isLecturer: false,
    bio: 'Mahasiswa Institut Pertanian Bogor. Mengelola perencanaan anggaran keuangan, penyediaan kebutuhan operasional, serta kelancaran sarana logistik tim dalam pelaksanaan program Pedal Juara.',
    prodi: 'Departemen Geofisika dan Meteorologi - Institut Pertanian Bogor',
  },
  {
    id: 'team-syaamil',
    name: 'Muhammad Syaamil',
    role: 'Secretary & Field Technical',
    cardImg: '/syaamil-card.png',
    isLecturer: false,
    bio: 'Mahasiswa Institut Pertanian Bogor. Bertanggung jawab atas alur administrasi, dokumentasi resmi program, serta dukungan teknis persiapan kegiatan pengabdian di lapangan.',
    prodi: 'Departemen Ilmu Komputer - Institut Pertanian Bogor',
  },
  {
    id: 'team-wafi',
    name: 'Muhammad Wafi R.',
    role: 'Public Relation',
    cardImg: '/wafi-card.png',
    isLecturer: false,
    bio: 'Mahasiswa IPB University. Menjalin komunikasi eksternal, kemitraan strategis dengan institusi sasaran, publikasi media, serta koordinasi hubungan masyarakat.',
    prodi: 'Departemen Ilmu Komputer - Institut Pertanian Bogor',
  },
  {
    id: 'team-melly',
    name: 'Dr. Ir. Melly Latifah M.Si.',
    role: 'Dosen Pendamping',
    cardImg: '/bumelly-card.png',
    isLecturer: true,
    bio: 'Dosen Departemen Ilmu Keluarga dan Konsumen, Fakultas Ekologi Manusia IPB University. Memberikan arahan akademis, pendampingan metodologi pengembangan karakter anak, serta supervisi pelaksanaan program PKM-PM Pedal Juara.',
    prodi: 'Dosen IPB University',
  },
];

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  const openBio = (member) => {
    setSelectedMember(member);
  };

  const closeBio = () => {
    setSelectedMember(null);
  };

  return (
    <section className="team" id="tim-kami">
      <div className="team__container">
        <h2 className="team__heading">Berkenalan dengan tim kami!</h2>
        <p className="team__subheading">Klik pada foto anggota tim untuk melihat biografi lengkap</p>

        <div className="team__cards-wrapper">
          {teamMembers.map(member => (
            <div
              key={member.id}
              id={member.id}
              className={`team__member-card ${member.isLecturer ? 'team__member-card--lecturer' : ''}`}
              onClick={() => openBio(member)}
              title={`Klik untuk melihat profil ${member.name}`}
            >
              <div className="team__image-container">
                <img
                  src={member.cardImg}
                  alt={member.name}
                  className="team__card-img"
                />
              </div>

              <div className="team__member-info">
                <h3 className="team__member-name">{member.name}</h3>
                <span className={`team__member-role ${member.isLecturer ? 'team__member-role--lecturer' : ''}`}>
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Biografi */}
      {selectedMember && (
        <div className="team__modal-overlay" onClick={closeBio}>
          <div className="team__modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="team__modal-close" onClick={closeBio} aria-label="Tutup">
              &times;
            </button>
            <div className="team__modal-body">
              <div className="team__modal-image-wrap">
                <img
                  src={selectedMember.cardImg}
                  alt={selectedMember.name}
                  className="team__modal-img"
                />
              </div>
              <div className="team__modal-details">
                <span className={`team__modal-role ${selectedMember.isLecturer ? 'team__modal-role--lecturer' : ''}`}>
                  {selectedMember.role}
                </span>
                <h3 className="team__modal-name">{selectedMember.name}</h3>
                <p className="team__modal-prodi">{selectedMember.prodi}</p>
                <div className="team__modal-divider" />
                <p className="team__modal-bio">{selectedMember.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
