# SoroglTickets
Discord uygulaması için destek talebi botu

# Nedir ne işe yarar?
SoroglTickets, discord sunucunuzda kullanıcıların destek talebi açmanızı sağlar. Kullanıcılar talep açıp kapatabilirler. 
(Talepler kapandıktan sonra silinmez, yöneticiler tarafından kontrol edildikten sonra isteğe bağlı olarak silinebilir.)

Örnek görseller:<br>
![ticket1](https://user-images.githubusercontent.com/77791070/152216611-51868224-81ec-4f7d-97ae-ff40cca110a6.png)<br>
![ticket2](https://user-images.githubusercontent.com/77791070/152216635-f713b1b1-3cdd-4132-93e5-29cd70ddd009.png)<br>
![ticket3](https://user-images.githubusercontent.com/77791070/152216640-7cf13055-17cb-4fc8-a11d-919090a48e8c.PNG)<br>
![ticket4](https://user-images.githubusercontent.com/77791070/152216655-fcf324c4-839a-48cb-9d26-05b0c0bf5db0.PNG)

# Nasıl kurulur?
- İlk olarak modüllerimizi kurmak için terminalde `npm install` komutunu çalıştırıyoruz,
- Ardından [`Discord Developers`](https://discord.com/developers/applications) adresinden bir app oluşturuyoruz ve bot kısmından token'ı alıp config.json dosyasında ki token bölmesine yapıştırıyoruz
- Ardından botumuzu sunucuya davet edeceğiz, [`Discord Permissions Calculator`](https://discordapi.com/permissions.html) içerisinde bot id'mizi (Discord Developers adresinden alabilirsiniz) Client ID bölümüne yapıştırıp scope kısmına `bot applications.commands` olduğu gibi yazıyoruz. Ardından oluşan linkten botu sunucuya davet ediyoruz.
- Bot'un modüllerini kurduk ve ayarlarını yaptık, sonraki aşamaya geçebiliriz.

# Nasıl işler ve başlatılır?
Botu başlatmak için tek yapmanız gereken terminalde `npm start` komutunu çalıştırmaktır.
Ardından taleplerin oluşturulması için gereken mesajı talepler için oluşturduğunuz odada /ticket komutunu çalıştırarak botun talep mesajını göndermesini sağlıyabilirsiniz.

Nasıl işliyor peki? [`Discord.JS`](https://discord.js.org) modülü sayesinde discord üzerindeki çoğu özelliğe bot ile erişim sağlayıp çoğu özelliği otomasyon bir hale getirebiliyoruz, bu sayedede belirli fonksiyonlarla ve eventler ile benim yaptığım gibi botlar yapabiliyorsunuz.
Örnek olarak `<guild>.channels.create(..)` fonksiyonunu kullanarak bu botta butona tıklandığında kanal oluşturulmasını sağladım. Aynı zamanda `interactionCreate` event'ı ile butona tıklanıp tıklanmadığını kontrol edip işlem yaptırarak olası hata ve açıkları kapattım. Kısacası bu şekilde, eğer daha fazla bilgi istiyorsanız [`Discord.JS dökümasyonunu`](https://discord.js.org) okuyarak daha fazla bilgi alabilirsiniz.
  
# Kaynaklar
[`Discord.JS`](https://www.npmjs.com/package/discord.js)
[`glob`](https://www.npmjs.com/package/glob)
  
# Lisans ve sahiplik
  Bu bot EfeSoroglu#0001 tarafından yapılmış olup Apache 2.0 ile lisanslanmıştır. Başka bir yerde değiştirilip satılması yasaktır!
