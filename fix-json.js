import fs from 'fs';
import path from 'path';

const credentials = {
    "type": "service_account",
    "project_id": "incubrix-auth",
    "private_key_id": "1a14232b40ffa984dd0ee83266dedca8cdd0b258",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9jCRl98ATmJzQ\nrRZRpOy/QIdv3NjFNFgOTO+TAsEh/oMnQ/k2YkpO1z/K/drksaILLNZKf7Jp9evs\nhjD38P6+1FjfcO69Ek+Yh1sOTE8GLDxnNNxbuJbZio0eXJkPmJ3w9RwdbTROoXyA\n0U21gZJGQmQ34Fc10cnG4HCwcVJ58XM/s+nIit0cfIlf//ax2i1IZLJnCSx9Qqbk\nTbzn++pnlON9+p5clO/VDLN5iS3Y3PYhiCJNTstRru1ZZ8xn9zUR3Ue5N2ui74N6\nVs4nld3eSCDFWWxcqNubhyYp5pxQ0fxT7yvTfQD3QqKe6cuc5c4qZiROgWNJTDJv\n1nszQN1lAgMBAAECggEAJHwQ9oKjeXIm/yDN+r2m52JNn4nQPNdIOspy0+aUE83I\nY3q5Qc9WE8ppaFKIO3x4nzOMdO8TAcPZG2AyFUuRUVyQ1cOIZKLdaNPnAj/Mdzj1\nEH2Ti+EiQjHh224B9UdQYXTgqkZequL5EteW4GDWLclyPnIjf0PIFcyWTFQnxrpO\nrvnih4D2kZGjVPZHvte9ScFXqI0Wp1HlN8M03VljUE4ZAMw+zrT+kylq5rrWwXu1\nCKoyDOBOS7QMd6/9zjFxFJFjYtpk1AziZFMA5k8rsy4VyywKl4SYTZGn+zyWgCuB\n/7Q3zHvscbg4jjBLF3LHnzP6phIsfI6cwOdqbVIX0QKBgQDwa5L7Ug5vkPKvRPsd\IWiIVSi9wSt0jiPWmwg5TD3M2b5dDJrbb8Qztwd7kDUEZdcd23rndBsp2ZrcnMDQ\nz/Nj3M3nNRE6H818vBOtQqxQb/rpqPuDy/iwhjgB9SAY5yMc78m1PHRnCCrobKYb\n/+lNS9oL9Barzh+vkeALq49wdQKBgQDJ1J6PPz3ds+DQAJgh3PYuC1sOuO/pp86q\n/kr8WYYz9uurhtMVVWxcjRFTz/JU0hBm+0eqkvAKAHHwyjL771/ReIwjeRF2+9nM\nEeO+WMCesEkwALcF3O7Rjy8OWh1Ms2o+/EddIzfOUG2W6E1PRiwoGuIp6peN81Ib\n7+I0zjAbMQKBgAxnMFUA3bfJvYtnPqE5GQB3jDuF3K0NrDGlG96A3WtVDGoWfWK2\nuGOGnL82KFYKvvdOXF/WcJRPIpshBx1+rOrI+GJmLXZXL62wsj8tAmC/9izZx+f7\nvN+2fOs07yv5uKkEgd50uPibxkLpYARvxmRzdlNJi2Xfo2jWWL2hYywFAoGARFMw\nIjo8jVMZphCtb7lHtaqudrtwrF7cfdJ8PBVqcykB+x03VB+JAYPX+9GHreM3HkWu\qzX3AMvJxsQMonEUtOrkNhYELY1w276qpIOTIaV4AUIcs2Vpi5O3UFp9VLvgGdZ5\nqjQD7loX32Bg25db12/SZHJAQBPBFigNIeczLeECgYEArUhhJQqOlM9RuM3dwHMm\nWRKlgn++kiEj63DVCcBWu2HEmt/EtOWmQa3z/mK8NQBQZQHOA+Yvv6UjO5fhZI6K\nV+eB3XR/2mrLNohnzBbD1Yjv9EXE404YhJsct0mARFo7N9iv4JMGgcegTGKlVCSV\n/TWUGZO+gW/ZSPOhNEddoB4=\n-----END PRIVATE KEY-----\n",
    "client_email": "incubrix-calendar-service@incubrix-auth.iam.gserviceaccount.com",
    "client_id": "108725433266049928657",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/incubrix-calendar-service%40incubrix-auth.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

const keyPath = path.resolve('server/config/service-account.json');
fs.writeFileSync(keyPath, JSON.stringify(credentials, null, 2));
console.log('✅ Corrected service-account.json');
