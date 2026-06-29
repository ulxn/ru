const CARDS = [
    // Greetings & Basics
    { id: 1, en: "Hello!", ru: "Привет!", pronun: "Pri-vyét!", literal: "(informal greeting)", note: "Use Здравствуйте (Zdráv-stvuy-tye) in formal situations." },
    { id: 2, en: "Good morning!", ru: "Доброе утро!", pronun: "Dó-bro-ye út-ro!", literal: "Good morning!", note: "" },
    { id: 3, en: "Good afternoon!", ru: "Добрый день!", pronun: "Dób-riy dyen'!", literal: "Good day!", note: "" },
    { id: 4, en: "Good evening!", ru: "Добрый вечер!", pronun: "Dób-riy vyé-cher!", literal: "Good evening!", note: "" },
    { id: 5, en: "Goodbye!", ru: "До свидания!", pronun: "Da svi-dá-ni-ya!", literal: "Until (we) meet again!", note: "Пока (Pa-ká) is informal." },
    { id: 6, en: "How are you?", ru: "Как дела?", pronun: "Kak de-lá?", literal: "How (are your) affairs?", note: "Как ты? (Kak tý?) is very informal." },
    { id: 7, en: "I'm fine, thanks.", ru: "Хорошо, спасибо.", pronun: "Kha-ra-shó, spa-sí-ba.", literal: "Good, thank you.", note: "" },
    { id: 8, en: "What is your name?", ru: "Как вас зовут?", pronun: "Kak vas za-vút?", literal: "How are you called?", note: "Как тебя зовут? (Kak te-byá?) is informal." },
    { id: 9, en: "My name is...", ru: "Меня зовут...", pronun: "Me-nyá za-vút...", literal: "Me they-call...", note: "" },
    { id: 10, en: "Nice to meet you!", ru: "Приятно познакомиться!", pronun: "Pri-yát-na paz-na-kó-mi-tsya!", literal: "Pleasant to acquaint!", note: "" },

    // Politeness
    { id: 11, en: "Please.", ru: "Пожалуйста.", pronun: "Pa-zhá-luy-sta.", literal: "Please.", note: "Also means 'You're welcome'." },
    { id: 12, en: "Thank you.", ru: "Спасибо.", pronun: "Spa-sí-ba.", literal: "Thank you.", note: "Большое спасибо = Thank you very much." },
    { id: 13, en: "You're welcome.", ru: "Пожалуйста.", pronun: "Pa-zhá-luy-sta.", literal: "Please / You're welcome.", note: "Same word as 'please'." },
    { id: 14, en: "Excuse me.", ru: "Извините.", pronun: "Iz-vi-ní-tye.", literal: "Excuse (me).", note: "Прости (Pra-stí) is informal." },
    { id: 15, en: "I'm sorry.", ru: "Мне жаль.", pronun: "Mnye zhal'.", literal: "To me (it is) a pity.", note: "Простите = Forgive me (formal)." },
    { id: 16, en: "No problem!", ru: "Ничего страшного!", pronun: "Ni-che-vó strásh-na-va!", literal: "Nothing terrible!", note: "" },

    // Yes / No / Questions
    { id: 17, en: "Yes.", ru: "Да.", pronun: "Da.", literal: "Yes.", note: "" },
    { id: 18, en: "No.", ru: "Нет.", pronun: "Nyet.", literal: "No.", note: "" },
    { id: 19, en: "Maybe.", ru: "Может быть.", pronun: "Mó-zhet byt'.", literal: "Might be.", note: "" },
    { id: 20, en: "I don't know.", ru: "Я не знаю.", pronun: "Ya nye zná-yu.", literal: "I not know.", note: "" },
    { id: 21, en: "I understand.", ru: "Я понимаю.", pronun: "Ya pa-ni-má-yu.", literal: "I understand.", note: "" },
    { id: 22, en: "I don't understand.", ru: "Я не понимаю.", pronun: "Ya nye pa-ni-má-yu.", literal: "I not understand.", note: "" },
    { id: 23, en: "Do you speak English?", ru: "Вы говорите по-английски?", pronun: "Vy ga-va-rí-tye pa ang-líy-ski?", literal: "You speak in-English?", note: "" },
    { id: 24, en: "I speak a little Russian.", ru: "Я немного говорю по-русски.", pronun: "Ya neem-nó-ga ga-va-ryú pa-rús-ki.", literal: "I a-little speak in-Russian.", note: "" },
    { id: 25, en: "Could you repeat that?", ru: "Повторите, пожалуйста.", pronun: "Paf-ta-rí-tye, pa-zhá-luy-sta.", literal: "Repeat, please.", note: "" },
    { id: 26, en: "Speak slowly, please.", ru: "Говорите медленнее.", pronun: "Ga-va-rí-tye myéd-le-ne-ye.", literal: "Speak more-slowly.", note: "" },

    // Numbers & Time
    { id: 27, en: "How old are you?", ru: "Сколько вам лет?", pronun: "Skól-ka vam lyet?", literal: "How many you years?", note: "Use ВАМ for strangers, ТЕБЕ for friends." },
    { id: 28, en: "What time is it?", ru: "Который час?", pronun: "Ka-tó-ry chas?", literal: "Which hour?", note: "" },
    { id: 29, en: "What day is today?", ru: "Какой сегодня день?", pronun: "Ka-kóy se-vód-nya dyen'?", literal: "Which today day?", note: "" },
    { id: 30, en: "Today is Monday.", ru: "Сегодня понедельник.", pronun: "Se-vód-nya pa-ne-dyél-nik.", literal: "Today (is) Monday.", note: "" },

    // Directions & Location
    { id: 31, en: "Where is the bathroom?", ru: "Где туалет?", pronun: "Gdye tu-a-lyét?", literal: "Where (is) toilet?", note: "" },
    { id: 32, en: "Where is the metro?", ru: "Где метро?", pronun: "Gdye met-ró?", literal: "Where (is) metro?", note: "" },
    { id: 33, en: "Turn left.", ru: "Поверните налево.", pronun: "Pa-ver-ní-tye na-lyé-va.", literal: "Turn to-left.", note: "" },
    { id: 34, en: "Turn right.", ru: "Поверните направо.", pronun: "Pa-ver-ní-tye na-prá-va.", literal: "Turn to-right.", note: "" },
    { id: 35, en: "Go straight ahead.", ru: "Идите прямо.", pronun: "I-dí-tye prya-ma.", literal: "Go straight.", note: "" },
    { id: 36, en: "It is near / far.", ru: "Это близко / далеко.", pronun: "É-ta blyís-ka / da-le-kó.", literal: "This near / far.", note: "" },
    { id: 37, en: "I am lost.", ru: "Я заблудился.", pronun: "Ya za-blu-díl-sya.", literal: "I got-lost.", note: "Woman says: заблудилась (za-blu-dí-las')." },

    // Shopping
    { id: 38, en: "How much does this cost?", ru: "Сколько это стоит?", pronun: "Skól-ka é-ta stó-it?", literal: "How-much this costs?", note: "" },
    { id: 39, en: "That is too expensive.", ru: "Это слишком дорого.", pronun: "É-ta slísh-kam dó-ra-ga.", literal: "This too expensive.", note: "" },
    { id: 40, en: "Do you have...?", ru: "У вас есть...?", pronun: "U vas yest'...?", literal: "At you there-is...?", note: "" },
    { id: 41, en: "I'll take this.", ru: "Я возьму это.", pronun: "Ya vaz'-mú é-ta.", literal: "I will-take this.", note: "" },
    { id: 42, en: "Can I pay by card?", ru: "Можно платить картой?", pronun: "Mózh-na pla-tít' kár-tay?", literal: "Possible to-pay by-card?", note: "" },
    { id: 43, en: "The receipt, please.", ru: "Чек, пожалуйста.", pronun: "Chyek, pa-zhá-luy-sta.", literal: "Receipt, please.", note: "" },

    // Food & Drinks
    { id: 44, en: "I am hungry.", ru: "Я хочу есть.", pronun: "Ya kha-chú yest'.", literal: "I want to-eat.", note: "" },
    { id: 45, en: "I am thirsty.", ru: "Я хочу пить.", pronun: "Ya kha-chú pit'.", literal: "I want to-drink.", note: "" },
    { id: 46, en: "A table for two, please.", ru: "Столик на двоих, пожалуйста.", pronun: "Stó-lik na dva-íkh, pa-zhá-luy-sta.", literal: "Table for two, please.", note: "" },
    { id: 47, en: "The menu, please.", ru: "Меню, пожалуйста.", pronun: "Me-nyú, pa-zhá-luy-sta.", literal: "Menu, please.", note: "" },
    { id: 48, en: "I'd like water, please.", ru: "Воду, пожалуйста.", pronun: "Vó-du, pa-zhá-luy-sta.", literal: "Water, please.", note: "" },
    { id: 49, en: "It's delicious!", ru: "Очень вкусно!", pronun: "Ó-chen' fkús-na!", literal: "Very tasty!", note: "" },
    { id: 50, en: "The bill, please.", ru: "Счёт, пожалуйста.", pronun: "Shchyot, pa-zhá-luy-sta.", literal: "Bill, please.", note: "" },

    // Transport
    { id: 51, en: "Where does this bus go?", ru: "Куда идёт этот автобус?", pronun: "Ku-dá i-dyót é-tat af-tó-bus?", literal: "Where goes this bus?", note: "" },
    { id: 52, en: "One ticket to..., please.", ru: "Один билет до..., пожалуйста.", pronun: "A-dín bi-lyét da..., pa-zhá-luy-sta.", literal: "One ticket to..., please.", note: "" },
    { id: 53, en: "When does the train leave?", ru: "Когда отходит поезд?", pronun: "Kag-dá at-khó-dit pó-yezd?", literal: "When departs train?", note: "" },
    { id: 54, en: "I need a taxi.", ru: "Мне нужно такси.", pronun: "Mnye núzh-na tak-sí.", literal: "To-me needed taxi.", note: "" },
    { id: 55, en: "Take me to this address.", ru: "Отвезите меня по этому адресу.", pronun: "At-ve-zí-tye me-nyá pa é-ta-mu á-dre-su.", literal: "Drive-me by this address.", note: "" },

    // Health
    { id: 56, en: "I need a doctor.", ru: "Мне нужен врач.", pronun: "Mnye nú-zhen vrach.", literal: "To-me needed doctor.", note: "" },
    { id: 57, en: "Call an ambulance!", ru: "Вызовите скорую помощь!", pronun: "Vý-za-vi-tye skó-ru-yu pó-mash'!", literal: "Call quick help!", note: "" },
    { id: 58, en: "I have a headache.", ru: "У меня болит голова.", pronun: "U me-nyá ba-lít ga-la-vá.", literal: "At me hurts head.", note: "" },
    { id: 59, en: "I am allergic to...", ru: "У меня аллергия на...", pronun: "U me-nyá a-ler-gí-ya na...", literal: "At me allergy to...", note: "" },
    { id: 60, en: "Where is the pharmacy?", ru: "Где аптека?", pronun: "Gdye ap-tyé-ka?", literal: "Where (is) pharmacy?", note: "" },

    // Accommodation
    { id: 61, en: "I have a reservation.", ru: "У меня есть бронь.", pronun: "U me-nyá yest' bron'.", literal: "At me there-is reservation.", note: "" },
    { id: 62, en: "Is breakfast included?", ru: "Завтрак включён?", pronun: "Závt-rak fklyú-chon?", literal: "Breakfast included?", note: "" },
    { id: 63, en: "The room key, please.", ru: "Ключ от номера, пожалуйста.", pronun: "Klyuch at nó-me-ra, pa-zhá-luy-sta.", literal: "Key from room, please.", note: "" },
    { id: 64, en: "My room is dirty.", ru: "В моём номере грязно.", pronun: "V ma-yóm nó-me-rye gryáz-na.", literal: "In my room dirty.", note: "" },
    { id: 65, en: "I'd like to check out.", ru: "Я хочу выехать.", pronun: "Ya kha-chú vý-ye-khat'.", literal: "I want to-check-out.", note: "" },

    // Work & Study
    { id: 66, en: "What do you do for work?", ru: "Кем вы работаете?", pronun: "Kyem vy ra-bó-ta-ye-tye?", literal: "(As) whom you work?", note: "" },
    { id: 67, en: "I am a student.", ru: "Я студент.", pronun: "Ya stu-dyént.", literal: "I (am) student.", note: "Woman says: студентка (stu-dyént-ka)." },
    { id: 68, en: "I work at...", ru: "Я работаю в...", pronun: "Ya ra-bó-ta-yu v...", literal: "I work in...", note: "" },
    { id: 69, en: "I have a meeting.", ru: "У меня встреча.", pronun: "U me-nyá fstrye-cha.", literal: "At me meeting.", note: "" },
    { id: 70, en: "Send me an email.", ru: "Пришлите мне письмо на почту.", pronun: "Prish-lí-tye mnye pis'-mó na poch-tu.", literal: "Send me letter to mail.", note: "" },

    // Family & People
    { id: 71, en: "This is my friend.", ru: "Это мой друг.", pronun: "É-ta moy drug.", literal: "This my friend.", note: "Female friend: подруга (pad-rú-ga)." },
    { id: 72, en: "I have two children.", ru: "У меня двое детей.", pronun: "U me-nyá dvó-ye de-tyéy.", literal: "At me two-of children.", note: "" },
    { id: 73, en: "How old is your child?", ru: "Сколько лет вашему ребёнку?", pronun: "Skól-ka lyet vá-she-mu re-byón-ku?", literal: "How-many years your child?", note: "" },
    { id: 74, en: "I am married.", ru: "Я женат.", pronun: "Ya zhe-nát.", literal: "I married.", note: "Woman says: замужем (zá-mu-zhem)." },
    { id: 75, en: "I am single.", ru: "Я не женат.", pronun: "Ya nye zhe-nát.", literal: "I not married.", note: "Woman says: не замужем (nye zá-mu-zhem)." },

    // Weather
    { id: 76, en: "What's the weather like?", ru: "Какая погода?", pronun: "Ka-ká-ya pa-gó-da?", literal: "What (kind) weather?", note: "" },
    { id: 77, en: "It's hot today.", ru: "Сегодня жарко.", pronun: "Se-vód-nya zhár-ka.", literal: "Today hot.", note: "" },
    { id: 78, en: "It's cold today.", ru: "Сегодня холодно.", pronun: "Se-vód-nya khó-lad-na.", literal: "Today cold.", note: "" },
    { id: 79, en: "It's raining.", ru: "Идёт дождь.", pronun: "I-dyót dozh'd'.", literal: "Goes rain.", note: "Идёт literally means 'goes' — rain 'goes' in Russian." },
    { id: 80, en: "It's snowing.", ru: "Идёт снег.", pronun: "I-dyót snyeg.", literal: "Goes snow.", note: "" },

    // Emotions & Opinions
    { id: 81, en: "I like this.", ru: "Мне нравится это.", pronun: "Mnye nrá-vi-tsya é-ta.", literal: "To-me pleases this.", note: "" },
    { id: 82, en: "I don't like this.", ru: "Мне не нравится это.", pronun: "Mnye nye nrá-vi-tsya é-ta.", literal: "To-me not pleases this.", note: "" },
    { id: 83, en: "I am happy.", ru: "Я счастлив.", pronun: "Ya shás-liv.", literal: "I happy.", note: "Woman says: счастлива (shás-li-va)." },
    { id: 84, en: "I am tired.", ru: "Я устал.", pronun: "Ya us-tál.", literal: "I got-tired.", note: "Woman says: устала (us-tá-la)." },
    { id: 85, en: "I am bored.", ru: "Мне скучно.", pronun: "Mnye skúch-na.", literal: "To-me boring.", note: "" },
    { id: 86, en: "That's interesting!", ru: "Это интересно!", pronun: "É-ta in-te-ryes-na!", literal: "This interesting!", note: "" },
    { id: 87, en: "That's great!", ru: "Отлично!", pronun: "At-lích-na!", literal: "Excellent!", note: "Классно (Klás-na) = Cool! (informal)" },

    // Technology & Everyday
    { id: 88, en: "Do you have Wi-Fi?", ru: "Есть ли у вас Wi-Fi?", pronun: "Yest' li u vas vay-fay?", literal: "There-is whether at you Wi-Fi?", note: "" },
    { id: 89, en: "What is the password?", ru: "Какой пароль?", pronun: "Ka-kóy pa-ról'?", literal: "What (is) password?", note: "" },
    { id: 90, en: "My phone is dead.", ru: "Мой телефон разрядился.", pronun: "Moy te-le-fón raz-rya-díl-sya.", literal: "My phone discharged.", note: "" },
    { id: 91, en: "Can I charge my phone?", ru: "Можно зарядить телефон?", pronun: "Mózh-na za-rya-dít' te-le-fón?", literal: "Possible to-charge phone?", note: "" },
    { id: 92, en: "Take a photo, please.", ru: "Сфотографируйте меня, пожалуйста.", pronun: "Sfo-ta-gra-fí-ruy-tye me-nyá, pa-zhá-luy-sta.", literal: "Photograph me, please.", note: "" },

    // Social
    { id: 93, en: "Happy birthday!", ru: "С днём рождения!", pronun: "S dnyom razh-dyé-ni-ya!", literal: "With day of-birth!", note: "" },
    { id: 94, en: "Cheers! (toast)", ru: "За здоровье!", pronun: "Za zda-ró-vye!", literal: "To (your) health!", note: "" },
    { id: 95, en: "Good luck!", ru: "Удачи!", pronun: "U-dá-chi!", literal: "(Of) luck!", note: "" },
    { id: 96, en: "Have a nice trip!", ru: "Счастливого пути!", pronun: "Shchas-lí-va-va pu-tí!", literal: "Happy journey!", note: "" },
    { id: 97, en: "Let's go!", ru: "Поехали!", pronun: "Pa-yé-kha-li!", literal: "We-went!", note: "Famous phrase said by Gagarin at launch." },
    { id: 98, en: "Wait a moment.", ru: "Подождите, пожалуйста.", pronun: "Pa-dazh-dí-tye, pa-zhá-luy-sta.", literal: "Wait, please.", note: "" },
    { id: 99, en: "Help!", ru: "Помогите!", pronun: "Pa-ma-gí-tye!", literal: "Help (me)!", note: "" },
    { id: 100, en: "I love you.", ru: "Я тебя люблю.", pronun: "Ya te-byá lyub-lyú.", literal: "I you love.", note: "Я вас люблю (formal/plural). The most important phrase!" },
];