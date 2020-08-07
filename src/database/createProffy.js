module.exports = async function(db, { proffyValue, classValue, classScheduleValues }){
    // Inserir dados na tabela de Proffys
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // Inserir dados na tabela de Classes

    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost, 
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    const class_id = insertedClass.lastID

    // Inserir dados na tabela class_schedule

    // Aqui ele guarda o valor que será inserido em Arrays. 
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return  db.run(`
            INSERT INTO class_schedule(
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })
    // Aqui, logo abaixo, ele executa de fato a inserção de cada Array, ou seja, ele joga na tabela.

    await Promise.all(insertedAllClassScheduleValues)
}