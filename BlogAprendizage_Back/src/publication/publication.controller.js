import Publication from './publication.model.js'
import Comment from '../comment/comment.model.js'

//Función para registrar un publication
export const save = async(req, res) => {
    const data = req.body
    try {
        const publication = new Publication(data)
        await publication.save()
        return res.send(
            {
                success: true,
                message: `${publication.title} | saved successfully`,
                publication
            }
        )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

//Obtener todos
export const getAll = async(req, res)=>{
    const { limit, skip } = req.query
    try{
        const publications = await Publication.find()
            .skip(skip)
            .limit(limit)

        if(publications.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Publications not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Publications found:',
                total: publications.length + ' publications',
                publications
            }
        )
 
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding publication',
                err
            }
        )
    }
}

export const getPublication = async(req, res)=>{
    try {
        let {id} = req.params
        let publication = await Publication.findById(id)
            
        if(!publication)
        return res.status(404).send(
            {
                success: false,
                message: 'Publication not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Publication found',
                publication
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const createDefaultPublications = async () => {
    try {
        const defaultPublications = [
            {
                title: "Introducción a SCRUM",
                mainText: "SCRUM es una metodología ágil muy utilizada en el desarrollo de software y otros proyectos informáticos. Permite organizar el trabajo en ciclos cortos llamados sprints para entregar funcionalidades de manera incremental. Con roles definidos como Scrum Master, Product Owner y Equipo de Desarrollo, facilita la comunicación y adaptación rápida a los cambios en los requerimientos. SCRUM mejora la productividad, la calidad del producto y la satisfacción del cliente al promover la colaboración y la transparencia en el equipo de trabajo.",
                course: "Taller",
                author: "Admin"
            },
            {
                title: "Tecnología y Sociedad",
                mainText: "La tecnología informática ha revolucionado la sociedad moderna al cambiar la forma en que las personas se comunican, acceden a la información y trabajan. Desde la creación de las computadoras hasta el internet y los dispositivos móviles, estos avances han transformado la educación, la economía y la cultura. Sin embargo, también plantean desafíos como la seguridad de los datos, la privacidad y la brecha digital. Entender la relación entre tecnología y sociedad es esencial para aprovechar sus beneficios y mitigar sus riesgos.",
                course: "Tecnología",
                author: "Admin"
            },
            {
                title: "Informe de Práctica Supervisada",
                mainText: "La práctica supervisada en informática permite a los estudiantes aplicar conocimientos teóricos en entornos reales de trabajo. En este proceso se enfrentan a problemas prácticos relacionados con desarrollo de software, administración de sistemas o soporte técnico. Además, adquieren habilidades de trabajo en equipo, gestión de proyectos y uso de herramientas especializadas. Esta experiencia es fundamental para complementar la formación académica y prepararse para los retos profesionales del área tecnológica.",
                course: "Práctica Supervisada",
                author: "Admin"
            },
            {
                title: "Fundamentos de Programación",
                mainText: "Los fundamentos de programación son esenciales para cualquier estudiante de informática. Incluyen el aprendizaje de estructuras básicas como variables, condicionales, bucles y funciones. A través del uso de lenguajes como Python, JavaScript o Java, los estudiantes desarrollan habilidades para resolver problemas mediante algoritmos y lógica computacional. Comprender estos conceptos es clave para avanzar hacia áreas más complejas como el desarrollo web, móvil, inteligencia artificial o ciencia de datos.",
                course: "Taller",
                author: "Admin"
            },
            {
                title: "Impacto de la Inteligencia Artificial",
                mainText: "La inteligencia artificial está transformando diversas industrias mediante el uso de algoritmos que permiten a las máquinas aprender de datos. Su aplicación abarca desde asistentes virtuales hasta sistemas de recomendación, análisis predictivo y vehículos autónomos. Aunque representa una gran oportunidad de innovación, también plantea preocupaciones éticas como el uso de datos personales, la automatización del empleo y la toma de decisiones automatizada. Es fundamental abordar estos temas desde una perspectiva crítica y responsable.",
                course: "Tecnología",
                author: "Admin"
            }
        ]

        for (const pub of defaultPublications) {
            const exists = await Publication.findOne({ title: pub.title })
            if (!exists) {
                const newPub = new Publication(pub)
                await newPub.save()
                console.log(`Default publication created: ${pub.title}`)
            } else {
                console.log(`Publication already exists: ${pub.title}`)
            }
        }
    } catch (err) {
        console.error("Error creating default publications", err)
    }
}
