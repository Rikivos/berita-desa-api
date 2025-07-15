
# Kampung KB Abyakta

Kampung KB Abyakta adalah website blog yang memberikan informasi, edukasi, dan update terkini mengenai program Kampung Keluarga Berencana (KB) di Indonesia, khususnya di Tanjung Pinang.

## Instalasi

- Clone repository ini:
```bash
  isi disini 
```
- Masuk ke direktori proyek:
```bash
  isi disini 
```
- Install dependensi:
```bash
  isi disini 
```
- Jalankan aplikasi secara lokal:
```bash
  isi disini
```
- Akses di:
```bash
  http://localhost:isi-disini.
```
## API Endpoint

Untuk mendapatkan data dari server, Anda dapat mengakses API melalui endpoint berikut:

```bash
https://github.com/Rikivos/berita-desa-api.git
```

## Tabel Database
### users :
| Value     | Tipe Data |
| ------ | ------ |
| _id | ObjectId |
| name | String |
| email | String |
| password | String |
| createdAt | Date |
| updatedAt | Date |

### posts :
| Value     | Tipe Data |
| ------    | ------    |
| _id | ObjectId |
| title | String |
| slug | String |
| image | String |
| content | ObjectId |
| user | ObjectId |
| status | String |
| createdAt | Date |
| updatedAt | Date |

### categories :
| Value     | Tipe Data |
| ------    | ------    |
| _id | ObjectId |
| name | String |
| slug | String |
| user | ObjectId |
| createdAt | Date |
| updatedAt | Date |

### comments :
| Value     | Tipe Data |
| ------    | ------    |
| _id | ObjectId |
| post | ObjectId |
| user | ObjectId |
| content | String |
| parent | ObjectId |
| createdAt | Date |
| updatedAt | Date |

## Deployment

Aplikasi ini telah dideploy di Vercel. Anda dapat mengaksesnya secara langsung di:

```bash
  https://github.com/Rikivos/berita-desa-api.git
```


## Authors

- [@Rikivos](https://github.com/Rikivos/)
- [@annafikk](https://github.com/annafikk)
