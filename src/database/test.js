const DataBase = require('./db')
const createProffy = require('./createProffy');

DataBase.then(async (db) => {
    // Inserção de dados

    proffyValue = {
        name: 'Luigi de Oliveira',
        avatar: 'https://avatars3.githubusercontent.com/u/54213955?s=460&u=ffda1647819bde18373c6bc3a3f545d234f28e0a&v=4',
        whatsapp: '992675727',
        bio: 'My name is Luigi Oliveira from Brazil. Student of Systems Development at ETEC Guarulhos since 2019. Welcome to my profile 🖖',
    }

    classValue = {
        subject: 1,
        cost: "20",
        // A chave estrangeira — proffy_id — virá pelo Banco de Dados 
    }
    
    classScheduleValues = [
        // O class_id, semelhante ao proffy_id, virá pelo Banco de Dados.
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 3,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})
    
    // Início das operações de consulta nos dados inseridos

    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // Seleção das classes de professor e seus dados.

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // Seleção por filtros que se assemelham a tal pesquisa
    const selectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "3"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "1200"
    `)
    //console.log(selectClassesSchedule)
    

})