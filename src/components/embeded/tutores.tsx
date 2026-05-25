import { useTranslation } from 'react-i18next'
import ContenidoHtml from './ContenidoHtml'
import { CabeceraTitulo } from './CabeceraTitulo'
import './tutores.css'

// Ejemplo: reemplaza este HTML por tu contenido real (tablas de horarios, etc.), es necesario parsear el HTML para que se pueda renderizar en el iframe.
const html = `
 <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tutores ICO</title>

<style>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
    }

    body{
        display: flex;
        min-height: 100vh;
        background-color: #f4f6f9;
    }

    /* SIDEBAR */
    .sidebar{
        width: 260px;
        background-color: #003366;
        color: white;
        padding: 25px;
    }

    .sidebar h3{
        margin-bottom: 20px;
    }

    .sidebar label{
        display: block;
        margin-top: 15px;
        margin-bottom: 5px;
        font-size: 14px;
    }

    .sidebar input, .sidebar select{
        width: 100%;
        padding: 8px;
        border: none;
        border-radius: 5px;
        outline: none;
    }

    /* CONTENIDO */
    .contenido{
        flex: 1;
        padding: 30px;
        overflow-x: auto;
    }

    h2{
        color: #003366;
        margin-bottom: 20px;
        text-align: center;
    }

    table{
        width: 100%;
        border-collapse: collapse;
        min-width: 700px;
    }

    thead{
        background-color: #003366;
        color: white;
    }

    th, td{
        padding: 12px;
        text-align: center;
        border: 1px solid #ddd;
    }

    /* TABLA BICOLOR */
    tbody tr:nth-child(odd){
        background-color: #ffffff;
    }

    tbody tr:nth-child(even){
        background-color: #e9edf2;
    }

    tbody tr:hover{
        background-color: rgba(218,165,32,0.2);
        transition: 0.2s;
    }

    a{
        color: #003366;
        font-size: 0.85rem;
        text-decoration: none;
        font-weight: bold;
    }

    a:hover{
        color: #DAA520;
    }

    /* RESPONSIVE */
    @media(max-width:768px){
        body{
            flex-direction: column;
        }

        .sidebar{
            width: 100%;
        }

        table{
            min-width: 600px;
        }
    }
    /* OCULTAR FILTROS EN CELULAR Y TABLET */
@media(max-width:992px){
    .sidebar{
        display: none;
    }

    body{
        flex-direction: column;
    }
}
/* CONTENEDOR NORMAL EN ESCRITORIO */
.tabla-contenedor{
    width: 100%;
}

/* RESPONSIVE */
@media(max-width:992px){

    /* Ocultar filtros */
    .sidebar{
        display: none;
    }

    body{
        flex-direction: column;
    }

    /* SOLO LA TABLA SE DESPLAZA */
    .tabla-contenedor{
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    table{
        min-width: 700px;
    }
        }
    </style>
</head>
<body>

<div class="sidebar">
    <h3>Filtrar Información</h3>

    <label>Grupo</label>
    <input type="text" id="filtroGrupo">

    <label>Profesor</label>
    <input type="text" id="filtroProfesor">

    <label>Turno</label>
    <select id="filtroTurno">
        <option value="">Todos</option>
        <option value="	MATUTINO	">Matutino</option>
        <option value="	VESPERTINO	">Vespertino</option>
    </select>
    </div>

<div class="contenido">
    <h2>Tutores 2026-II</h2>
<div class="tabla-contenedor">
    <table>
                    <thead>
            <tr>
                <th>Grupo</th>
                <th>Profesor</th>
                <th>Turno</th>
                <th>Salón</th>
                <th>Horario</th>
                <th>Correo</th>
            </tr>
                    </thead>
        <tbody id="tablaDatos"></tbody>
                </table>
            </div>

<script>

const datos = [
     {grupo:"	2258	", profesor:"	ALBA VILLA BELEN ANAID	", turno:"	VESPERTINO	", salon:"	A504	", horario:"	19:00-21:00 M,J.	", correo:"	belenalba749@aragon.unam.mx	"},
 {grupo:"	2260	", profesor:"	ALMANZAR VAZQUEZ MARIA GUADALUPE	", turno:"	VESPERTINO	", salon:"	A215	", horario:"	20:00-22:00 M,J.	", correo:"	guadalupealmanzar1a@aragon.unam.mx	"},
 {grupo:"	2458	", profesor:"	ALVAREZ SORIANO MANUEL ALEJANDRO	", turno:"	VESPERTINO	", salon:"	A214	", horario:"	19:00-20:30 L,M,V	", correo:"	alejandroalvarez17@aragon.unam.mx	"},
 {grupo:"	2860	", profesor:"	ANAYA MANILA DZOARA IVETTE	", turno:"	VESPERTINO	", salon:"	A11204	", horario:"	20:30-21:50 L, M, V.	", correo:"	Dzoaraanayaq5@aragon.unam.mx 	"},
 {grupo:"	2607	", profesor:"	BERNAL DIAZ ARCELIA	", turno:"	MATUTINO	", salon:"	A216	", horario:"	8:40-10:00 L,M,V.	", correo:"	arceliabernal83@aragon.unam.mx	"},
 {grupo:"	2657	", profesor:"	CAMACHO ALVAREZ JUAN CARLOS	", turno:"	VESPERTINO	", salon:"	A507	", horario:"	13:00-15:00 M,J.	", correo:"	juancamachocaa@aragon.unam.mx	"},
 {grupo:"	2859	", profesor:"	CAMPOS BRAVO JORGE IVAN	", turno:"	VESPERTINO	", salon:"	A204	", horario:"	19:00-21:00 M,J.	", correo:"	jorgecampos47@aragon.unam.mx	"},
 {grupo:"	2357	", profesor:"	CRUZ LUEVANO BLANCA ESTELA	", turno:"	VESPERTINO	", salon:"	A8119	", horario:"	19:50-21:50 M,J.	", correo:"	blancaluevanoq9@aragon.unam.mx	"},
 {grupo:"	2658	", profesor:"	CRUZ LUEVANO BLANCA ESTELA	", turno:"	VESPERTINO	", salon:"	A8121	", horario:"	17:40-19:00 L,M,J.	", correo:"	blancaluevanoq9@aragon.unam.mx	"},
 {grupo:"	2207	", profesor:"	FERIA VICTORIA MARIA ANGELICA	", turno:"	MATUTINO	", salon:"	A214	", horario:"	7:00-9:00 M,J.	", correo:"	angelicaferiaf6@aragon.unam.mx	"},
 {grupo:"	2208	", profesor:"	GARCIA VILLANUEVA MA. DEL PILAR	", turno:"	MATUTINO	", salon:"	A215	", horario:"	9:00-11:00 M,J.	", correo:"	magarciap9@aragon.unam.mx	"},
 {grupo:"	2307	", profesor:"	GARCIA VILLANUEVA MA. DEL PILAR	", turno:"	MATUTINO	", salon:"	A504	", horario:"	10:00-12:00 L, M	", correo:"	magarciap9@aragon.unam.mx	"},
 {grupo:"	2408	", profesor:"	GARCIA VILLANUEVA MA. DEL PILAR	", turno:"	MATUTINO	", salon:"	A213	", horario:"	11:00-13:00 M,J.	", correo:"	magarciap9@aragon.unam.mx	"},
 {grupo:"	2810	", profesor:"	GARIBAY PEDRAZA ALMA LILIA	", turno:"	MATUTINO	", salon:"	A214	", horario:"	13:00-15:00 M,J.	", correo:"	almagaribayr7@aragon.unam.mx	"},
 {grupo:"	2107	", profesor:"	GASTALDI PEREZ JUAN	", turno:"	MATUTINO	", salon:"	A8119	", horario:"	9:00-11:00 M,J.	", correo:"	juangastaldi9a@aragon.unam.mx	"},
 {grupo:"	2107	", profesor:"	GASTALDI PEREZ JUAN	", turno:"	MATUTINO	", salon:"	A8119	", horario:"	9:00-11:00 M,J.	", correo:"	juangastaldi9a@aragon.unam.mx	"},
 {grupo:"	2457	", profesor:"	GONZALEZ BETANCOURT RAFAEL	", turno:"	VESPERTINO	", salon:"	A215	", horario:"	20:30-22:00 L,M,V.	", correo:"	rafaelgonzalezma2@aragon.unam.mx	"},
 {grupo:"	2409	", profesor:"	GUTIERREZ CASTILLO ALMA ROSA	", turno:"	MATUTINO	", salon:"	A505	", horario:"	8:30-9:50 L,M,V.	", correo:"	almagutierrez88@aragon.unam.mx	"},
 {grupo:"	2407	", profesor:"	HERNANDEZ CABRERA JESUS	", turno:"	MATUTINO	", salon:"	A203	", horario:"	8:40-10:00 L,M,V.	", correo:"	jesushernandezls7@aragon.unam.mx	"},
 {grupo:"	2660	", profesor:"	HERNANDEZ CONTRERAS JUAN MANUEL	", turno:"	VESPERTINO	", salon:"	A504	", horario:"	15:00-16:20 L,M,V.	", correo:"	juanhernandez1z7@aragon.unam.mx	"},
 {grupo:"	2808	", profesor:"	JUAREZ ROBLES ELIZABETH	", turno:"	MATUTINO	", salon:"	A204	", horario:"	9:00-11:00 M,J.	", correo:"	elizabethjuarezjur@aragon.unam.mx	"},
 {grupo:"	2809	", profesor:"	JUAREZ ROBLES ELIZABETH	", turno:"	MATUTINO	", salon:"	A506	", horario:"	11:00-13:00 L,M.	", correo:"	elizabethjuarezjur@aragon.unam.mx	"},
 {grupo:"	2907	", profesor:"	JUAREZ ROBLES ELIZABETH	", turno:"	MATUTINO	", salon:"	A203	", horario:"	15:00-17:00 L,M.	", correo:"	elizabethjuarezjur@aragon.unam.mx	"},
 {grupo:"	2659	", profesor:"	LOZANO MENDEZ EFREN	", turno:"	VESPERTINO	", salon:"	A507	", horario:"	17:00-19:00 L,M.	", correo:"	efrenlozanogg2@aragon.unam.mx	"},
 {grupo:"	2410	", profesor:"	MENDOZA GONZALEZ OMAR	", turno:"	MATUTINO	", salon:"	A204	", horario:"	10:00-11:20 L,M,V.	", correo:"	omarmendoza564@aragon.unam.mx	"},
 {grupo:"	2807	", profesor:"	MENDOZA GONZALEZ OMAR	", turno:"	MATUTINO	", salon:"	A204	", horario:"	11:40-13:00 L,M,V.	", correo:"	omarmendoza564@aragon.unam.mx	"},
 {grupo:"	2757	", profesor:"	OCAMPO ALVAREZ ARTURO	", turno:"	VESPERTINO	", salon:"	A8120	", horario:"	16:00-18:00 M,J.	", correo:"	arturoocampo76@aragon.unam.mx	"},
 {grupo:"	2210	", profesor:"	ORTIZ CORDERO GABRIEL	", turno:"	MATUTINO	", salon:"	A506	", horario:"	11:00-13:00 M,J.	", correo:"	gabrielortizoic@aragon.unam.mx	"},
 {grupo:"	2610	", profesor:"	ORTIZ CORDERO GABRIEL	", turno:"	MATUTINO	", salon:"	A507	", horario:"	11:00-13:00 L,M.	", correo:"	gabrielortizoic@aragon.unam.mx	"},
 {grupo:"	2608	", profesor:"	PEREZ MEDEL MARCELO	", turno:"	MATUTINO	", salon:"	A506	", horario:"	9:00-11:00 M,J.	", correo:"	marcelomedelq7@aragon.unam.mx	"},
 {grupo:"	2209	", profesor:"	PEREZ VALDES JOEL ALFREDO	", turno:"	MATUTINO	", salon:"	A216	", horario:"	11:00-13:00 M,J.	", correo:"	joelperezpev@aragon.unam.mx	"},
 {grupo:"	2861	", profesor:"	QUIROZ ALMARAZ SERGIO	", turno:"	VESPERTINO	", salon:"	A507	", horario:"	19:00-21:00 M,J.	", correo:"	sergioquirozhs3@aragon.unam.mx	"},
 {grupo:"	2459	", profesor:"	REYES TECONTERO NORMA	", turno:"	VESPERTINO	", salon:"	A212	", horario:"	19:00-21:00 L,M.	", correo:"	normareyesi8@aragon.unam.mx	"},
 {grupo:"	2157	", profesor:"	RODRIGUEZ GARCIA ARTURO	", turno:"	VESPERTINO	", salon:"	A506	", horario:"	13:00-15:15 M,J.	", correo:"	arturorodriguez35@aragon.unam.mx	"},
 {grupo:"	2259	", profesor:"	RODRIGUEZ GARCIA ARTURO	", turno:"	VESPERTINO	", salon:"	A212	", horario:"	20:00-22:00 L, M, V.	", correo:"	arturorodriguez35@aragon.unam.mx	"},
 {grupo:"	2157	", profesor:"	RODRIGUEZ GARCIA ARTURO	", turno:"	VESPERTINO	", salon:"	A506	", horario:"	13:00-15:15 M,J.	", correo:"	arturorodriguez35@aragon.unam.mx	"},
 {grupo:"	2858	", profesor:"	ROMERO ANDALON JESUS ANGEL	", turno:"	VESPERTINO	", salon:"	A506	", horario:"	16:00-18:00 L,M.	", correo:"	jesusandalonsa@aragon.unam.mx	"},
 {grupo:"	2460	", profesor:"	SANCHEZ HERNANDEZ MIGUEL ANGEL	", turno:"	MATUTINO	", salon:"	A504	", horario:"	11:00-13:00 M,J.	", correo:"	miguelsanchezt32@aragon.unam.mx	"},
 {grupo:"	2958	", profesor:"	SOBERANES JAIME ROBERTO MISAEL	", turno:"	VESPERTINO	", salon:"	A8117	", horario:"	18:00-20:00 M,J.	", correo:"	misaelsoberanesr8@aragon.unam.mx	"},
 {grupo:"	2257	", profesor:"	SUAREZ HERRERA ALEJANDRO	", turno:"	VESPERTINO	", salon:"	A211	", horario:"	13:00-15:15 M,J.	", correo:"	alejandrosuarezsuh@aragon.unam.mx	"},
 {grupo:"	2857	", profesor:"	TORRES RODRIGUEZ GERARDO	", turno:"	VESPERTINO	", salon:"	CLOUD	", horario:"	19:00-21:00 M,J.	", correo:"	gerardotorreswa@aragon.unam.mx	"},
 {grupo:"	2557	", profesor:"	VELASCO AGUSTIN AARON	", turno:"	VESPERTINO	", salon:"	CCSAL7	", horario:"	15:00-17:00 M,J.	", correo:"	aaronvelascovea@aragon.unam.mx	"},
 {grupo:"	2707	", profesor:"	VELASCO AGUSTIN AARON	", turno:"	MATUTINO	", salon:"	CLOUD	", horario:"	11:00-13:00 L,M.	", correo:"	aaronvelascovea@aragon.unam.mx	"},
 {grupo:"	2708	", profesor:"	VELASCO AGUSTIN AARON	", turno:"	MATUTINO	", salon:"	A8121	", horario:"	11:00-13:00 L,M.	", correo:"	aaronvelascovea@aragon.unam.mx	"},
 {grupo:"	2507	", profesor:"	VERDUZCO RODRIGUEZ MARIANA	", turno:"	MATUTINO	", salon:"	CCSAL2	", horario:"	13:00-14:20 L,M,V.	", correo:"	marianaverduzco89@aragon.unam.mx	"},
 {grupo:"	2609	", profesor:"	VERDUZCO RODRIGUEZ MARIANA	", turno:"	MATUTINO	", salon:"	A212	", horario:"	11:40-13:00 L,M,V.	", correo:"	marianaverduzco89@aragon.unam.mx	"}

];

const tabla = document.getElementById("tablaDatos");
const filtroGrupo = document.getElementById("filtroGrupo");
const filtroProfesor = document.getElementById("filtroProfesor");
const filtroTurno = document.getElementById("filtroTurno");

function mostrarDatos(lista){
    tabla.innerHTML = "";
    lista.forEach(item=>{
        tabla.innerHTML += \`
        <tr>
            <td>\${item.grupo}</td>
            <td>\${item.profesor}</td>
            <td>\${item.turno}</td>
            <td>\${item.salon}</td>
            <td>\${item.horario}</td>
            <td><a href="mailto:\${item.correo}">\${item.correo}</a></td>
        </tr>\`;
    });
}

function filtrar(){
    const grupo = filtroGrupo.value.toLowerCase();
    const profesor = filtroProfesor.value.toLowerCase();
    const turno = filtroTurno.value;

    const filtrados = datos.filter(item =>
        item.grupo.toLowerCase().includes(grupo) &&
        item.profesor.toLowerCase().includes(profesor) &&
        (turno === "" || item.turno === turno)
    );

    mostrarDatos(filtrados);
}

/* FILTRO AUTOMÁTICO */
filtroGrupo.addEventListener("input", filtrar);
filtroProfesor.addEventListener("input", filtrar);
filtroTurno.addEventListener("change", filtrar);

mostrarDatos(datos);

</script>

</body>
</html>
`;

export function Tutores() {
  const { t } = useTranslation()

  return (
    <section className="tutores-embed" aria-labelledby="tutores-embed-title">
      <div className="tutores-embed__cabeceras">
        <CabeceraTitulo variante="dorado">
          {t('tutorsView.titulo')}
        </CabeceraTitulo>
      </div>
      <ContenidoHtml
        html={html}
        title={t('tutorsView.iframeTitle')}
        sandbox="allow-same-origin allow-scripts"
        className="tutores-embed__contenido"
        iframeStyle={{ minHeight: 'min(70vh, 720px)' }}
      />
    </section>
  )
}

export default Tutores
