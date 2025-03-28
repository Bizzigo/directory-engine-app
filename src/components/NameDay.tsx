
import React, { useState, useEffect } from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface NameDayData {
  today: string[];
  tomorrow: string[];
}

const NameDay: React.FC = () => {
  const [nameDays, setNameDays] = useState<NameDayData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNameDays = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Latvian name days data - simplified version
        // In a real application, this would be fetched from an API
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format dates as MM-DD
        const todayFormatted = `${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        const tomorrowFormatted = `${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow.getDate().toString().padStart(2, '0')}`;
        
        // Sample Latvian name days data
        const nameDaysDatabase: { [key: string]: string[] } = {
          "01-01": ["Laimnesis", "Solvita", "Solvija"],
          "01-02": ["Indulis", "Iva", "Ivo"],
          "01-03": ["Miervalda", "Miervaldis", "Ringolds"],
          "01-04": ["Spodra", "Ilva", "Ilvita"],
          "01-05": ["Sīmanis", "Zintis"],
          "01-06": ["Spulga", "Arnita"],
          "01-07": ["Rota", "Zigmārs", "Digmārs", "Juliāns"],
          "01-08": ["Gatis", "Ivanda"],
          "01-09": ["Kaspars", "Jautris", "Aksels"],
          "01-10": ["Tatjana", "Dorisa"],
          "01-11": ["Smaida", "Franciska"],
          "01-12": ["Reinis", "Reina", "Reinholds", "Renāts"],
          "01-13": ["Harijs", "Ārijs", "Āris", "Aira"],
          "01-14": ["Roberts", "Roberta", "Raitis", "Raits"],
          "01-15": ["Fēlikss", "Felicita"],
          "01-16": ["Lidija", "Lida"],
          "01-17": ["Tenis", "Dravis"],
          "01-18": ["Antons", "Antis", "Antonijs"],
          "01-19": ["Andulis", "Alnis"],
          "01-20": ["Oļģerts", "Orests", "Aļģirds"],
          "01-21": ["Agnese", "Agnija", "Agne"],
          "01-22": ["Austris", "Vincents", "Oļģerts"],
          "01-23": ["Grieta", "Strauta", "Rebeka"],
          "01-24": ["Krišs", "Ksenija", "Eglons"],
          "01-25": ["Zigurds", "Sigurds", "Sigvards"],
          "01-26": ["Ansis", "Agnis", "Agneta"],
          "01-27": ["Ilze", "Ildze", "Izolde"],
          "01-28": ["Kārlis", "Spodris"],
          "01-29": ["Aivars", "Valērijs"],
          "01-30": ["Tīna", "Valentīna", "Pārsla"],
          "01-31": ["Tekla", "Violeta"],
          "02-01": ["Brigita", "Indra", "Indars"],
          "02-02": ["Spīdola", "Sonora"],
          "02-03": ["Aīda", "Ida", "Vida"],
          "02-04": ["Daila", "Veronika", "Dominiks"],
          "02-05": ["Agate", "Selga", "Silga", "Selgita"],
          "02-06": ["Dace", "Dārta", "Dora"],
          "02-07": ["Nelda", "Rihards", "Ričards"],
          "02-08": ["Aldona", "Česlavs"],
          "02-09": ["Simona", "Apolonija"],
          "02-10": ["Paulīne", "Paula", "Jasmīna"],
          "02-11": ["Laima", "Laimdota"],
          "02-12": ["Karlīna", "Līna"],
          "02-13": ["Malda", "Melita"],
          "02-14": ["Valentīns"],
          "02-15": ["Alvils", "Olafs", "Aloizs", "Olavs"],
          "02-16": ["Jūlija", "Džuljeta"],
          "02-17": ["Donats", "Konstance"],
          "02-18": ["Kora", "Kintija"],
          "02-19": ["Zane", "Zuzanna"],
          "02-20": ["Vitauts", "Smuidra", "Smuidris"],
          "02-21": ["Eleonora", "Ariadne"],
          "02-22": ["Ārija", "Rigonda", "Adrians", "Adriāna", "Adrija"],
          "02-23": ["Haralds", "Almants"],
          "02-24": ["Diāna", "Dina", "Dins"],
          "02-25": ["Alma", "Annemarija"],
          "02-26": ["Evelīna", "Aurēlija", "Mētras"],
          "02-27": ["Līvija", "Līva", "Andra"],
          "02-28": ["Skaidrīte", "Skaidra", "Justs", "Justīne"],
          "02-29": ["Ilgvars", "Selgvards"],
          "03-01": ["Ivars", "Ilgvars"],
          "03-02": ["Lavīze", "Luīze", "Laila"],
          "03-03": ["Tālis", "Tālavs", "Marts"],
          "03-04": ["Alise", "Auce", "Enija"],
          "03-05": ["Austra", "Aurora"],
          "03-06": ["Vents", "Centis", "Gotfrīds"],
          "03-07": ["Ella", "Elmīra"],
          "03-08": ["Dagmāra", "Marga", "Margita"],
          "03-09": ["Ēvalds"],
          "03-10": ["Silvija", "Laimrota", "Liliāna"],
          "03-11": ["Konstantīns", "Agita"],
          "03-12": ["Aija", "Aiva", "Aivis"],
          "03-13": ["Ernests", "Balvis"],
          "03-14": ["Matilde", "Ulrika"],
          "03-15": ["Amilda", "Amalda", "Imalda"],
          "03-16": ["Guntis", "Guntars", "Guntris"],
          "03-17": ["Ģertrūde", "Gerda"],
          "03-18": ["Ilona", "Adelīna"],
          "03-19": ["Jāzeps", "Juzefa"],
          "03-20": ["Made", "Irbe"],
          "03-21": ["Una", "Unigunde", "Dzelme", "Benedikts"],
          "03-22": ["Tamāra", "Dziedra", "Gabriela", "Gabriels"],
          "03-23": ["Mirdza", "Žanete", "Žanna"],
          "03-24": ["Kazimirs", "Izidors"],
          "03-25": ["Māra", "Mārīte", "Marita"],
          "03-26": ["Eiženija", "Ženija"],
          "03-27": ["Gustavs", "Gusts", "Tālrīts"],
          "03-28": ["Gunta", "Ginta", "Gunda"],
          "03-29": ["Aldona", "Agija"],
          "03-30": ["Nanija", "Ilgmārs"],
          "03-31": ["Gvido", "Atvars"],
          "04-01": ["Dagnis", "Dagne"],
          "04-02": ["Irmgarde"],
          "04-03": ["Daira", "Dairis", "Daiva"],
          "04-04": ["Valda", "Herta", "Ārvalda", "Ārvaldis", "Ārvalds"],
          "04-05": ["Vija", "Vidaga", "Aivija"],
          "04-06": ["Zinta", "Vīlips", "Dzinta", "Filips"],
          "04-07": ["Zina", "Zinaīda", "Helmuts"],
          "04-08": ["Edgars", "Danute", "Dana", "Dans"],
          "04-09": ["Valerija", "Žubīte", "Alla"],
          "04-10": ["Anita", "Anitra", "Zīle"],
          "04-11": ["Hermanis", "Vilmārs"],
          "04-12": ["Jūlijs", "Ainis"],
          "04-13": ["Egils", "Egīls", "Nauris"],
          "04-14": ["Strauja", "Gudrīte"],
          "04-15": ["Aelita", "Gastons"],
          "04-16": ["Mintauts", "Alfs", "Bernadeta"],
          "04-17": ["Rūdolfs", "Viviāna"],
          "04-18": ["Laura", "Jadviga"],
          "04-19": ["Vēsma", "Fanija"],
          "04-20": ["Mirta", "Ziedīte"],
          "04-21": ["Marģers", "Anastasija"],
          "04-22": ["Armands", "Armanda"],
          "04-23": ["Jurģis", "Juris", "Georgs"],
          "04-24": ["Visvaldis", "Nameda", "Ritvaldis"],
          "04-25": ["Līksma", "Bārbala"],
          "04-26": ["Alīna", "Sandris", "Rūsiņš"],
          "04-27": ["Tāle", "Raimonda", "Raina", "Klementīne"],
          "04-28": ["Gundega", "Terēze"],
          "04-29": ["Vilnis", "Raimonds", "Lora"],
          "04-30": ["Lilija", "Liāna"],
          "05-01": ["Ziedonis"],
          "05-02": ["Zigmunds", "Sigmunds", "Zigismunds"],
          "05-03": ["Gints", "Uģis"],
          "05-04": ["Vizbulīte", "Viola", "Vijolīte"],
          "05-05": ["Ģirts", "Ģederts"],
          "05-06": ["Gaidis", "Didzis"],
          "05-07": ["Henriete", "Henrijs", "Jete", "Enriko"],
          "05-08": ["Staņislavs", "Staņislava", "Stefānija"],
          "05-09": ["Klāvs", "Ervīns", "Ervīna", "Klāvs", "Einārs"],
          "05-10": ["Maija", "Paija"],
          "05-11": ["Milda", "Karmena", "Manfreds"],
          "05-12": ["Valija", "Ināra", "Ina", "Inārs"],
          "05-13": ["Irēna", "Irīna", "Ira", "Iraīda"],
          "05-14": ["Krišjānis", "Elvita", "Elfa", "Aivita"],
          "05-15": ["Sofija", "Taiga", "Arita", "Airita"],
          "05-16": ["Edvīns", "Edijs"],
          "05-17": ["Herberts", "Dailis", "Umberts"],
          "05-18": ["Inese", "Inesis", "Ēriks"],
          "05-19": ["Lita", "Sibilla", "Teika"],
          "05-20": ["Venta", "Salvis", "Selva"],
          "05-21": ["Ernestīne", "Ingmārs", "Akvelīna"],
          "05-22": ["Emīlija", "Vizma"],
          "05-23": ["Leontīne", "Leokādija", "Ligija", "Lonija"],
          "05-24": ["Ilvija", "Marlēna", "Ziedone"],
          "05-25": ["Anšlavs", "Junora"],
          "05-26": ["Edvards", "Eduards", "Varis"],
          "05-27": ["Dzidra", "Gunita", "Loreta", "Dzidris"],
          "05-28": ["Vilis", "Vilhelms"],
          "05-29": ["Maksis", "Raivis", "Raivo"],
          "05-30": ["Vitolds", "Lolita"],
          "05-31": ["Alīda", "Jūsma"],
          "06-01": ["Biruta", "Mairita", "Bernedīne"],
          "06-02": ["Lība", "Emma"],
          "06-03": ["Inta", "Ineta", "Intra"],
          "06-04": ["Elfrīda", "Sintija", "Sindija"],
          "06-05": ["Igors", "Margots", "Ingvars"],
          "06-06": ["Ingrīda", "Ardis"],
          "06-07": ["Gaida", "Arnis", "Arno"],
          "06-08": ["Frīdis", "Frīda", "Mundra"],
          "06-09": ["Ligita", "Gita"],
          "06-10": ["Malva", "Anatols", "Anatolijs"],
          "06-11": ["Ingus", "Mairis", "Vidvuds"],
          "06-12": ["Nora", "Lenora", "Ija"],
          "06-13": ["Zigfrīds", "Ainārs", "Uva"],
          "06-14": ["Tija", "Saiva", "Sentis", "Santis", "Saivis"],
          "06-15": ["Baņuta", "Žermēna", "Vilija", "Vits"],
          "06-16": ["Justīne", "Juta"],
          "06-17": ["Arturs", "Artis"],
          "06-18": ["Alberts", "Madis"],
          "06-19": ["Viktors", "Nils"],
          "06-20": ["Rasma", "Rasa", "Maira"],
          "06-21": ["Emīls", "Egita", "Monvīds"],
          "06-22": ["Ludmila", "Laimdots", "Laimiņš"],
          "06-23": ["Līga"],
          "06-24": ["Jānis"],
          "06-25": ["Milija", "Maiga"],
          "06-26": ["Ausma", "Inguna", "Ingūna", "Inguns", "Ausmis"],
          "06-27": ["Malvīne", "Malvis"],
          "06-28": ["Viesturs", "Viestards", "Kitija"],
          "06-29": ["Pēteris", "Pauls", "Paulis", "Pāvils"],
          "06-30": ["Tālivaldis", "Mareks"],
          "07-01": ["Imants", "Rimants", "Ingars", "Intars"],
          "07-02": ["Lauma", "Ilvars", "Halina"],
          "07-03": ["Benita", "Everita", "Verita", "Emerita"],
          "07-04": ["Ulvis", "Uldis", "Sandis", "Sandijs"],
          "07-05": ["Andžs", "Andžejs", "Edīte", "Esmeralda"],
          "07-06": ["Anrijs", "Arkādijs"],
          "07-07": ["Alda", "Maruta"],
          "07-08": ["Antra", "Adele", "Ada"],
          "07-09": ["Zaiga", "Asne", "Asna"],
          "07-10": ["Lija", "Olīvija", "Odrija", "Olivers"],
          "07-11": ["Leonora", "Svens"],
          "07-12": ["Indriķis", "Ints", "Namejs"],
          "07-13": ["Margrieta", "Margarita"],
          "07-14": ["Oskars", "Ritvars", "Anvars"],
          "07-15": ["Egons", "Egmonts", "Egija", "Henriks", "Henrihs"],
          "07-16": ["Hermīne", "Estere"],
          "07-17": ["Aleksis", "Aleksejs", "Alekss"],
          "07-18": ["Rozālija", "Roze"],
          "07-19": ["Jautrīte", "Kamila", "Digna", "Sāra"],
          "07-20": ["Ritma", "Ramona"],
          "07-21": ["Meldra", "Meldris", "Melisa"],
          "07-22": ["Marija", "Marika", "Marina"],
          "07-23": ["Magda", "Magone", "Mērija", "Magdalēna"],
          "07-24": ["Kristīne", "Kristīna", "Krista", "Kristiāna", "Kristiāns"],
          "07-25": ["Jēkabs", "Žaklīna"],
          "07-26": ["Anna", "Ance", "Annija"],
          "07-27": ["Marta", "Dita", "Dite"],
          "07-28": ["Cecīlija", "Cilda"],
          "07-29": ["Edmunds", "Edžus", "Vidmants"],
          "07-30": ["Valters", "Renārs", "Regnārs"],
          "07-31": ["Rūta", "Ruta", "Angelika", "Sigita"],
          "08-01": ["Albīns", "Albīna"],
          "08-02": ["Normunds", "Stefans"],
          "08-03": ["Augusts"],
          "08-04": ["Romāns", "Romualds", "Romualda"],
          "08-05": ["Osvalds", "Arvils"],
          "08-06": ["Askolds", "Aisma"],
          "08-07": ["Alfrēds", "Madars", "Fredis"],
          "08-08": ["Mudīte", "Vladislavs", "Vladislava"],
          "08-09": ["Madara", "Genoveva", "Genoveina"],
          "08-10": ["Brencis", "Inuta", "Audris"],
          "08-11": ["Olga", "Zita", "Liega", "Zigita"],
          "08-12": ["Vizma", "Klāra"],
          "08-13": ["Elvīra", "Velga", "Rēzija"],
          "08-14": ["Zelma", "Zemgus", "Virma"],
          "08-15": ["Zenta", "Dzelde", "Zelda"],
          "08-16": ["Astra", "Astrīda"],
          "08-17": ["Vineta", "Oļegs"],
          "08-18": ["Liene", "Helēna", "Elena", "Ellena", "Liena"],
          "08-19": ["Melānija", "Imanta"],
          "08-20": ["Bernhards", "Boriss", "Rojs"],
          "08-21": ["Janīna", "Linda"],
          "08-22": ["Rudīte", "Everts"],
          "08-23": ["Vitālijs", "Ralfs", "Valgudis"],
          "08-24": ["Bērtulis", "Boļeslavs"],
          "08-25": ["Ludvigs", "Ludis", "Ivonna", "Patrīcija", "Patriks"],
          "08-26": ["Natālija", "Tālija", "Broņislavs", "Broņislava"],
          "08-27": ["Žanis", "Jorens", "Alens"],
          "08-28": ["Auguste", "Guste"],
          "08-29": ["Armīns", "Vismants", "Aiga"],
          "08-30": ["Alvis", "Jolanta", "Samanta"],
          "08-31": ["Vilma", "Aigars"],
          "09-01": ["Ilmārs", "Iluta", "Austrums"],
          "09-02": ["Elīza", "Lizete", "Zete"],
          "09-03": ["Berta", "Bella"],
          "09-04": ["Dzintra", "Dzintara", "Dzintars"],
          "09-05": ["Klaudija", "Persijs", "Vaida"],
          "09-06": ["Maigonis", "Magnuss", "Mariuss"],
          "09-07": ["Regīna", "Ermīns"],
          "09-08": ["Ilga"],
          "09-09": ["Bruno", "Telma"],
          "09-10": ["Jausma", "Albertīne"],
          "09-11": ["Signe", "Signija"],
          "09-12": ["Erna", "Evita", "Eva"],
          "09-13": ["Iza", "Izabella"],
          "09-14": ["Sanita", "Santa", "Sanda", "Sanija", "Sandija"],
          "09-15": ["Sandra", "Gunvaldis", "Gunvaris", "Sondra"],
          "09-16": ["Asja", "Asnate", "Dāgs"],
          "09-17": ["Vera", "Vaira", "Vairis"],
          "09-18": ["Liesma", "Elita", "Alita"],
          "09-19": ["Verners", "Muntis"],
          "09-20": ["Guntra", "Marianna", "Ginters"],
          "09-21": ["Modris", "Matīss", "Mariss"],
          "09-22": ["Māris", "Maigurs", "Mārica"],
          "09-23": ["Vanda", "Vanesa", "Veneranda"],
          "09-24": ["Agris", "Agrita"],
          "09-25": ["Rodrigo", "Rauls"],
          "09-26": ["Gundars", "Kurts", "Knuts"],
          "09-27": ["Ādolfs", "Ilgonis"],
          "09-28": ["Sergejs", "Svetlana", "Lana"],
          "09-29": ["Miķelis", "Miks", "Mičelis", "Mihails"],
          "09-30": ["Elma", "Elna", "Menarda"],
          "10-01": ["Zanda", "Zandis", "Lāsma"],
          "10-02": ["Ilma", "Skaidris"],
          "10-03": ["Elza", "Ilizana"],
          "10-04": ["Modra", "Francis", "Dimitrijs"],
          "10-05": ["Amālija", "Amēlija"],
          "10-06": ["Monika", "Zilgma", "Zilga"],
          "10-07": ["Daumants", "Druvvaldis"],
          "10-08": ["Aina", "Anete"],
          "10-09": ["Elga", "Helga", "Elgars"],
          "10-10": ["Arvīds", "Arvis", "Druvis"],
          "10-11": ["Monta", "Tince", "Silva"],
          "10-12": ["Valfrīds", "Kira"],
          "10-13": ["Irma", "Mirga"],
          "10-14": ["Vilhelmīne", "Minna"],
          "10-15": ["Eda", "Hedviga", "Helvijs"],
          "10-16": ["Daiga", "Dinija", "Dinārs"],
          "10-17": ["Gaits", "Karīna", "Gaitis"],
          "10-18": ["Rolands", "Ronalds", "Erlends", "Rolanda", "Ronalda", "Erlenda"],
          "10-19": ["Elīna", "Drosma", "Drosmis"],
          "10-20": ["Leonīds", "Leonīda"],
          "10-21": ["Urzula", "Severīns"],
          "10-22": ["Īrisa", "Irīda", "Airisa"],
          "10-23": ["Daina", "Dainida", "Dainis"],
          "10-24": ["Renāte", "Modrīte", "Mudrīte"],
          "10-25": ["Beāte", "Beatrise"],
          "10-26": ["Amanda", "Kaiva", "Amanta"],
          "10-27": ["Lilita", "Irita", "Ita"],
          "10-28": ["Ņina", "Ninona", "Antoņina", "Oksana"],
          "10-29": ["Laimonis", "Elvijs", "Elva", "Elvis", "Laimis"],
          "10-30": ["Nadīna", "Ulla", "Adīna"],
          "10-31": ["Valts", "Rinalds", "Rinalda"],
          "11-01": ["Ikars"],
          "11-02": ["Vivita", "Dzīle", "Viva"],
          "11-03": ["Ērika", "Dagnija"],
          "11-04": ["Atis", "Otomārs", "Oto"],
          "11-05": ["Šarlote", "Lote"],
          "11-06": ["Linards", "Leons", "Leo", "Leonards", "Leonarda"],
          "11-07": ["Helma", "Lotārs"],
          "11-08": ["Aleksandra", "Agra"],
          "11-09": ["Teodors"],
          "11-10": ["Mārtiņš", "Mārcis", "Markuss", "Marks"],
          "11-11": ["Ojārs", "Rainers", "Nellija"],
          "11-12": ["Kaija", "Kornēlija"],
          "11-13": ["Eižens", "Jevgeņijs", "Jevgeņija"],
          "11-14": ["Fricis", "Vikentijs", "Vincents"],
          "11-15": ["Leopolds", "Undīne", "Unda"],
          "11-16": ["Banga", "Glorija"],
          "11-17": ["Hugo", "Uga", "Uģis"],
          "11-18": ["Aleksandrs", "Doloresa", "Brīve"],
          "11-19": ["Elizabete", "Liza", "Līze", "Betija"],
          "11-20": ["Anda", "Andīna", "Vigo"],
          "11-21": ["Zeltīte", "Andis"],
          "11-22": ["Aldis", "Alfons", "Aldris"],
          "11-23": ["Zigrīda", "Zigfrīda", "Zigrīds"],
          "11-24": ["Velta", "Velda"],
          "11-25": ["Katrīna", "Kate", "Kadrija", "Trīne", "Katrīne"],
          "11-26": ["Konrāds", "Sebastians"],
          "11-27": ["Lauris", "Norberts"],
          "11-28": ["Rita", "Vita", "Olita"],
          "11-29": ["Ignats", "Virgīnija"],
          "11-30": ["Andrievs", "Andrejs", "Andris"],
          "12-01": ["Arnolds", "Emanuels"],
          "12-02": ["Meta", "Sniedze"],
          "12-03": ["Evija", "Raita", "Jogita"],
          "12-04": ["Baiba", "Barbara", "Barba"],
          "12-05": ["Sabīne", "Sarma", "Klaudijs"],
          "12-06": ["Nikolajs", "Niklāvs", "Niks", "Nikola"],
          "12-07": ["Antonija", "Anta", "Dzirkstīte"],
          "12-08": ["Gunārs", "Vladimirs", "Gunis"],
          "12-09": ["Tabita", "Sarmīte"],
          "12-10": ["Guna", "Judīte"],
          "12-11": ["Voldemārs", "Valdemārs", "Valdis"],
          "12-12": ["Otīlija", "Iveta"],
          "12-13": ["Lūcija", "Veldze"],
          "12-14": ["Auseklis", "Gaisma"],
          "12-15": ["Johanna", "Hanna", "Jana"],
          "12-16": ["Alvīne"],
          "12-17": ["Hilda", "Teiksma"],
          "12-18": ["Kristaps", "Kristofers", "Krists", "Klinta"],
          "12-19": ["Lelde", "Sarmis"],
          "12-20": ["Arta", "Minjona"],
          "12-21": ["Toms", "Tomass", "Saulcerīte"],
          "12-22": ["Saulvedis"],
          "12-23": ["Viktorija", "Balva"],
          "12-24": ["Ādams", "Ieva"],
          "12-25": ["Stella", "Larisa"],
          "12-26": ["Dainuvīte", "Gija", "Megija"],
          "12-27": ["Elmārs", "Inita", "Helmārs"],
          "12-28": ["Inga", "Ivita", "Irvita", "Ingeborga"],
          "12-29": ["Solveiga", "Ilgona"],
          "12-30": ["Daniela", "Dāniels", "Dāvids", "Dāvis"],
          "12-31": ["Silvestrs", "Silvis", "Kalvis"]
        };
        
        const todayNames = nameDaysDatabase[todayFormatted] || ["Nav Vārda dienu"];
        const tomorrowNames = nameDaysDatabase[tomorrowFormatted] || ["Nav Vārda dienu"];
        
        setNameDays({
          today: todayNames,
          tomorrow: tomorrowNames
        });
        
      } catch (err) {
        console.error('Name days fetch error:', err);
        setError('Could not load name days data');
      } finally {
        setLoading(false);
      }
    };

    fetchNameDays();
  }, []);

  return (
    <Card className="p-4 w-full">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Calendar className="h-5 w-5" />
            <span className="font-medium">Šodien</span>
          </div>
          <div className="text-sm">
            {nameDays?.today ? nameDays.today.join(', ') : '-'}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-5 w-5" />
            <span className="font-medium">Rīt</span>
          </div>
          <div className="text-sm">
            {nameDays?.tomorrow ? nameDays.tomorrow.join(', ') : '-'}
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-2">
          <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="text-sm text-destructive text-center py-1">
          {error}
        </div>
      )}
    </Card>
  );
};

export default NameDay;
