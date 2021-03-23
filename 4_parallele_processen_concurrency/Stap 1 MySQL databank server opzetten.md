# Labo-opdracht 4: WordPress opzetten in de Microsoft Azure cloudomgeving



| **Variabele**                    | **Inhoud**                               |
| -------------------------------- | ---------------------------------------- |
| Resourcegroep                    | SELabs-Wordpress                         |
| Naam databankserver              | db-server-selab                          |
| DNS-naam databankserver          | db-server-selab.mysql.database.azure.com |
| Beheerder databankserver         | super_admin                              |
| Wachtwoord databankserver        | #password123                             |
| Naam applicatieserver (Ubuntu)   | app-vm-selabs                            |
| DNS-naam applicatieserver        | app-server.westeurope.cloudapp.azure.com |
| Gebruikersnaam applicatieserver  | super_admin                              |
| Wachtwoord applicatieserver      | #password123                             |
| WordPress db user                | newuser                                  |
| Wachtwoord van WordPress db user | password                                 |
| WordPress user                   | admin                                    |
| WordPress user password          | admin                                    |



# Stap 1: MySQL databank server opzetten

1. Selecteer MySQL database en basic tier

   

   <img src="/home/henri/Pictures/Screenshot from 2021-03-21 07-50-11.png" style="zoom: 33%;" />

   <img src="/home/henri/Pictures/Screenshot from 2021-03-21 07-50-53.png" style="zoom: 50%;" />

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321075417634.png" alt="image-20210321075417634" style="zoom: 50%;" />

   

2. geef de database-server een naam, locatie en username met paswoord

   

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321075703286.png" alt="image-20210321075703286" style="zoom:67%;" />

3. Laat overige instelling op originele waarde staan en maak de server aan.

   

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321075925662.png" alt="image-20210321075925662" style="zoom:60%;" />![image-20210321075941772](/home/henri/.config/Typora/typora-user-images/image-20210321075941772.png)

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321075951602.png" alt="image-20210321075951602" style="zoom:50%;" />

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321080443847.png" alt="image-20210321080443847" style="zoom:67%;" />



# Stap 3: Ubuntu applicatieserver opzetten



1. geef de applicatie-server een naam, locatie en username met paswoord. Selecteer juiste type VM (B2s).

   

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321080822031.png" alt="image-20210321080822031" style="zoom:67%;" />

   ![image-20210321080641315](/home/henri/.config/Typora/typora-user-images/image-20210321080641315.png)

   

2. gebruik een standaard HDD

   

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321080855587.png" alt="image-20210321080855587" style="zoom:60%;" />

3. zet VM open voor HTTP, HTTPS en SSH.

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321080911913.png" alt="image-20210321080911913" style="zoom:67%;" />

4. Configureer automatisch afsluiten

   

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321081034635.png" alt="image-20210321081034635" style="zoom:67%;" />

   

5. Bevestig details en maak VM aan.

   

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321081053466.png" alt="image-20210321081053466" style="zoom:67%;" />

6. Bevestig Aanmaken van VM met correcte configuratie.

   

<img src="/home/henri/.config/Typora/typora-user-images/image-20210321081616106.png" alt="image-20210321081616106" style="zoom:67%;" />



# Stap 3. Aangemaakte applicatie- en databankserver verkennen en de configuratie ervan finaliseren



1. Configureer een DNS-naam voor de applicatie-server.

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321082230453.png" alt="image-20210321082230453" style="zoom:67%;" />

2. test SSH connectie met applicatie-server

   

   ![image-20210321094159171](/home/henri/.config/Typora/typora-user-images/image-20210321094159171.png)

   

3. Configureer toegang tot databank.

   

   ![image-20210321082826168](/home/henri/.config/Typora/typora-user-images/image-20210321082826168.png)

   

4. Configureer databank-server zodat connecties van applicatie-server worden toegelaten.

   

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321083004138.png" alt="image-20210321083004138" style="zoom:77%;" />

   

5. maak verbinding met MySQL server vanaf applicatie server

<img src="/home/henri/.config/Typora/typora-user-images/image-20210321083824235.png" alt="image-20210321083824235" style="zoom:67%;" />





# Stap 4. WordPress applicatie installeren



1. Installeer WordPress programma's.

   

   ![image-20210321084428215](/home/henri/.config/Typora/typora-user-images/image-20210321084428215.png)

   

2. configureer Apache

   

   ![image-20210321084655635](/home/henri/.config/Typora/typora-user-images/image-20210321084655635.png)

   ![image-20210321084714545](/home/henri/.config/Typora/typora-user-images/image-20210321084714545.png)

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321084802447.png" alt="image-20210321084802447" style="zoom:67%;" />

   

3. Configureer database. 

   ![image-20210321085225894](/home/henri/.config/Typora/typora-user-images/image-20210321085225894.png)

   ![image-20210321085238862](/home/henri/.config/Typora/typora-user-images/image-20210321085238862.png)

   ![image-20210321090037154](/home/henri/.config/Typora/typora-user-images/image-20210321090037154.png)

   ![image-20210321085500021](/home/henri/.config/Typora/typora-user-images/sd.png)

   

4. Configuratie WordPress

   

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321090018590.png" alt="image-20210321090018590" style="zoom:67%;" />

   

   ![image-20210321090244274](/home/henri/.config/Typora/typora-user-images/image-20210321090244274.png)

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321090326222.png" alt="image-20210321090326222" style="zoom:70%;" />

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321090404069.png" alt="image-20210321090404069" style="zoom: 50%;" />

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321090514878.png" alt="image-20210321090514878" style="zoom:50%;" />

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321090658391.png" alt="image-20210321090658391" style="zoom:50%;" />

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321090720614.png" alt="image-20210321090720614" style="zoom: 67%;" />

   <img src="/home/henri/.config/Typora/typora-user-images/image-20210321091104149.png" alt="image-20210321091104149" style="zoom:50%;" />

# Stap 5. Beveiliging toepassen



![image-20210321091329316](/home/henri/.config/Typora/typora-user-images/image-20210321091329316.png)

![image-20210321091419813](/home/henri/.config/Typora/typora-user-images/image-20210321091419813.png)

![image-20210321091450813](/home/henri/.config/Typora/typora-user-images/image-20210321091450813.png)

![image-20210321091525769](/home/henri/.config/Typora/typora-user-images/image-20210321091525769.png)

![image-20210321091656432](/home/henri/.config/Typora/typora-user-images/image-20210321091656432.png)

![image-20210321091745047](/home/henri/.config/Typora/typora-user-images/image-20210321091745047.png)



# Stap 6. Machines uitschakelen



![image-20210321091933346](/home/henri/.config/Typora/typora-user-images/image-20210321091933346.png)