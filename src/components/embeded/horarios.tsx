import { useTranslation } from 'react-i18next'
import ContenidoHtml from './ContenidoHtml'
import { CabeceraTitulo } from './CabeceraTitulo'
import './horarios.css'

// Ejemplo: reemplaza este HTML por tu contenido real (tablas de horarios, etc.), es necesario parsear el HTML para que se pueda renderizar en el iframe.
const html = `
  <!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Horarios - Ingeniería en Computación</title>

<style>
/* ===== COLORES UNAM ===== */
:root{
    --azul-unam:#003b5c;
    --dorado-unam:#cfae70;
}

/* ===== GENERAL ===== */
body{
    font-family: Arial, Helvetica, sans-serif;
    background:#ffffff;
    margin:10px;
}

h1{
    text-align:center;
    color:var(--azul-unam);
    font-size:clamp(18px, 3vw, 26px);
    margin-bottom:5px;
}

label{
    font-weight:bold;
    color:var(--azul-unam);
}

/* ===== SELECT ===== */
select{
    padding:8px;
    font-size:14px;
    width:100%;
    max-width:380px;
    margin:10px auto 15px;
    display:block;
    border:2px solid var(--azul-unam);
}

/* ===== CONTENEDOR RESPONSIVO ===== */
.table-container{
    width:100%;
    overflow-x:auto;
    border:2px solid var(--azul-unam);
}

/* ===== TABLA ===== */
table{
    width:100%;
    min-width:1050px;
    border-collapse:collapse;
    table-layout:fixed;
}

th{
    background:var(--azul-unam);
    color:#fff;
    border:2px solid var(--azul-unam);
    padding:6px;
    font-size:13px;
    white-space:nowrap;
}

td{
    border:1.5px solid var(--azul-unam);
    padding:6px;
    font-size:12px;
    text-align:center;
    word-break:break-word;
    overflow-wrap:anywhere;
}

td.left{ text-align:left; }

/* ===== FILA SEMESTRE ===== */
.semestre-row td{
    background:var(--dorado-unam);
    font-weight:bold;
    text-align:center;
    border-top:3px solid var(--azul-unam);
    border-bottom:3px solid var(--azul-unam);
    padding:10px;
}

/* ===== FILAS ===== */
tr:nth-child(even):not(.semestre-row){
    background:#f9f7f3;
}

/* ===== PROFESOR ===== */
.profesor{
    display:flex;
    flex-direction:column;
    gap:4px;
}

.nombre-profesor{
    font-weight:bold;
    font-size:12px;
}

.correo-profesor{
    font-size:10px;
    color:var(--azul-unam);
    text-decoration:none;
}

.correo-profesor:hover{
    text-decoration:underline;
}

/* ===== RESPONSIVE ===== */
@media (max-width:768px){
    th, td{
        font-size:11px;
        padding:5px;
    }

    .correo-profesor{ display:none; }

    .profesor{
        cursor:pointer;
    }

    .profesor::after{
        content:"📧";
        color:var(--azul-unam);
    }

    .profesor.activo .correo-profesor{
        display:block;
    }

    .profesor.activo::after{
        content:"";
    }
}
</style>
</head>

<body>

<h1>FACULTAD DE ESTUDIOS SUPERIORES ARAGÓN</h1>
<h1>INGENIERÍA EN COMPUTACIÓN</h1>


<select id="semestreSelect">
    <option value="all">🔹 MOSTRAR TODOS LOS SEMESTRES</option>
</select>

<div class="table-container">
<table>
<thead>
<tr>
    <th>Clv_Mat</th>
    <th>Materia</th>
    <th>Profesor</th>
    <th>Grupo</th>
    <th>Lunes</th>
    <th>Martes</th>
    <th>Miércoles</th>
    <th>Jueves</th>
    <th>Viernes</th>
    <th>Sábado</th>
    <th>Salón</th>
</tr>
</thead>
<tbody id="tablaBody"></tbody>
</table>
</div>

<script>
/* ===== JSON ===== */
const data = {
  semestres: [
    {
      nombre:"PRIMER SEMESTRE MATUTINO",
      materias:[
        { clv:"	1110	", materia:"	ALGEBRA	", profesor:{ nombre:"	HERNANDEZ LOPEZ SERGIO	", correo:"	sergiohernandezhel@aragon.unam.mx	" },  grupo:"	2107	",lunes:"		<br>		", martes:"	07:00	<br>	09:15	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:15	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11203	" },
{ clv:"	1109	", materia:"	CALCULO DIFERENCIAL E INTEGRAL	", profesor:{ nombre:"	GONZALEZ HERNANDEZ GERARDO	", correo:"	gerardogonzalezgoh@aragon.unam.mx	" },  grupo:"	2107	",lunes:"	08:30	<br>	10:00	", martes:"		<br>		",miercoles:"	08:30	<br>	10:00	",jueves:"		<br>		",viernes:"	08:30	<br>	10:00	", sabado:"		<br>		", salon:"	A11201	" },
{ clv:"	1111	", materia:"	COMPUTADORAS Y PROGRAMACION	", profesor:{ nombre:"	GASTALDI PEREZ JUAN	", correo:"	juangastaldi9a@aragon.unam.mx	" },  grupo:"	2107	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	1108	", materia:"	GEOMETRIA ANALITICA	", profesor:{ nombre:"	MARTINEZ ROMERO JONATHAN	", correo:"	jonathanmartinezky7@aragon.unam.mx	" },  grupo:"	2107	",lunes:"	11:30	<br>	13:00	", martes:"		<br>		",miercoles:"	11:30	<br>	13:00	",jueves:"		<br>		",viernes:"	11:30	<br>	13:00	", sabado:"		<br>		", salon:"	A205	" },
{ clv:"	1112	", materia:"	INTRODUCCION A LA INGENIERIA EN COMPUTACION	", profesor:{ nombre:"	ARELLANO OROZCO JUAN MANUEL	", correo:"	manuelarellanoa6@aragon.unam.mx	" },  grupo:"	2107	",lunes:"		<br>		", martes:"	07:00	<br>	08:30	",miercoles:"		<br>		",jueves:"	07:00	<br>	08:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	1110	", materia:"	ALGEBRA	", profesor:{ nombre:"	FALCON ARELLANO BERENICE ITZEL	", correo:"	berenicefalconlk6@aragon.unam.mx	" },  grupo:"	2108	",lunes:"	11:15	<br>	13:30	", martes:"		<br>		",miercoles:"	11:15	<br>	13:30	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8120	" },
{ clv:"	1111	", materia:"	COMPUTADORAS Y PROGRAMACION	", profesor:{ nombre:"	CRUZ ORTIZ MIRIAM	", correo:"	#N/D	" },  grupo:"	2108	",lunes:"		<br>		", martes:"	16:00	<br>	18:00	",miercoles:"		<br>		",jueves:"	16:00	<br>	18:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8121	" }

      ]
    },
    { nombre:"PRIMER SEMESTRE VESPERTINO", materias:[
        { clv:"	1110	", materia:"	ALGEBRA	", profesor:{ nombre:"	MARTINEZ ROMERO JONATHAN	", correo:"	jonathanmartinezky7@aragon.unam.mx	" },  grupo:"	2157	",lunes:"	13:00	<br>	14:30	", martes:"		<br>		",miercoles:"	13:00	<br>	14:30	",jueves:"		<br>		",viernes:"	13:00	<br>	14:30	", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	1109	", materia:"	CALCULO DIFERENCIAL E INTEGRAL	", profesor:{ nombre:"	RODRIGUEZ GARCIA ARTURO	", correo:"	arturorodriguez35@aragon.unam.mx	" },  grupo:"	2157	",lunes:"		<br>		", martes:"	13:00	<br>	15:15	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:15	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A506	" },
{ clv:"	1111	", materia:"	COMPUTADORAS Y PROGRAMACION	", profesor:{ nombre:"	RAMOS MARQUEZ JUAN CARLOS	", correo:"	juanramosram@aragon.unam.mx	" },  grupo:"	2157	",lunes:"		<br>		", martes:"	17:00	<br>	19:00	",miercoles:"		<br>		",jueves:"	17:00	<br>	19:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11202	" },
{ clv:"	1108	", materia:"	GEOMETRIA ANALITICA	", profesor:{ nombre:"	SOLIS ALCANTAR EVERARDO	", correo:"	everardosolisr0@aragon.unam.mx	" },  grupo:"	2157	",lunes:"	17:30	<br>	19:00	", martes:"		<br>		",miercoles:"	17:30	<br>	19:00	",jueves:"		<br>		",viernes:"	17:30	<br>	19:00	", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	1112	", materia:"	INTRODUCCION A LA INGENIERIA EN COMPUTACION	", profesor:{ nombre:"	PARRALES CASTAÑEDA CARLOS ALBERTO	", correo:"	carlosparralesgi2@aragon.unam.mx	" },  grupo:"	2157	",lunes:"	14:30	<br>	16:00	", martes:"		<br>		",miercoles:"	14:30	<br>	16:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	1112	", materia:"	INTRODUCCION A LA INGENIERIA EN COMPUTACION	", profesor:{ nombre:"	PARRALES CASTAÑEDA CARLOS ALBERTO	", correo:"	carlosparralesgi2@aragon.unam.mx	" },  grupo:"	2158	",lunes:"	16:00	<br>	17:30	", martes:"		<br>		",miercoles:"	16:00	<br>	17:30	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8117	" }
    ] },

    { nombre:"SEGUNDO SEMESTRE MATUTINO", materias:[
        { clv:"	0062	", materia:"	ALGEBRA LINEAL	", profesor:{ nombre:"	VIEYRA REBOYO LUIS ARMANDO	", correo:"	luisvieyra26@aragon.unam.mx	" },  grupo:"	2207	",lunes:"	08:30	<br>	10:00	", martes:"		<br>		",miercoles:"	08:30	<br>	10:00	",jueves:"		<br>		",viernes:"	08:30	<br>	10:00	", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	0063	", materia:"	CALCULO VECTORIAL	", profesor:{ nombre:"	MARTINEZ ROMERO JONATHAN	", correo:"	jonathanmartinezky7@aragon.unam.mx	" },  grupo:"	2207	",lunes:"	10:00	<br>	11:30	", martes:"		<br>		",miercoles:"	10:00	<br>	11:30	",jueves:"		<br>		",viernes:"	10:00	<br>	11:30	", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	1209	", materia:"	COMUNICACION	", profesor:{ nombre:"	MONDRAGON ESCOBAR ALFREDO	", correo:"	alfredomondragontg8@aragon.unam.mx	" },  grupo:"	2207	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1210	", materia:"	EMPRENDIMIENTO 1	", profesor:{ nombre:"	FERIA VICTORIA MARIA ANGELICA	", correo:"	angelicaferiaf6@aragon.unam.mx	" },  grupo:"	2207	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A211	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	SANCHEZ SANCHEZ VICTOR MANUEL	", correo:"	victorsanchez27@aragon.unam.mx	" },  grupo:"	2207	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	LOPEZ HERNANDEZ JORGE ARTURO	", correo:"	jorgelopez91@aragon.unam.mx	" },  grupo:"	2207	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"	11:30	<br>	14:30	", sabado:"		<br>		", salon:"	A506	" },
{ clv:"	0062	", materia:"	ALGEBRA LINEAL	", profesor:{ nombre:"	BLANCO BAUTISTA ROBERTO	", correo:"	robertoblancoir4@aragon.unam.mx	" },  grupo:"	2208	",lunes:"	11:30	<br>	13:00	", martes:"		<br>		",miercoles:"	11:30	<br>	13:00	",jueves:"		<br>		",viernes:"	11:30	<br>	13:00	", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	0063	", materia:"	CALCULO VECTORIAL	", profesor:{ nombre:"	MARTINEZ ROMERO JONATHAN	", correo:"	jonathanmartinezky7@aragon.unam.mx	" },  grupo:"	2208	",lunes:"	08:30	<br>	10:00	", martes:"		<br>		",miercoles:"	08:30	<br>	10:00	",jueves:"		<br>		",viernes:"	08:30	<br>	10:00	", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	1209	", materia:"	COMUNICACION	", profesor:{ nombre:"	MONDRAGON ESCOBAR ALFREDO	", correo:"	alfredomondragontg8@aragon.unam.mx	" },  grupo:"	2208	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	1210	", materia:"	EMPRENDIMIENTO 1	", profesor:{ nombre:"	GARCIA VILLANUEVA MA. DEL PILAR	", correo:"	magarciap9@aragon.unam.mx	" },  grupo:"	2208	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	PEÑALOZA ROMERO ERNESTO	", correo:"	ernestopenalozaffa@aragon.unam.mx	" },  grupo:"	2208	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"	A521	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	ROMERO ANDALON JESUS ANGEL	", correo:"	jesusandalonsa@aragon.unam.mx	" },  grupo:"	2208	",lunes:"		<br>		", martes:"	07:00	<br>	08:30	",miercoles:"		<br>		",jueves:"	07:00	<br>	08:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	0062	", materia:"	ALGEBRA LINEAL	", profesor:{ nombre:"	GONZALEZ HERNANDEZ GERARDO	", correo:"	gerardogonzalezgoh@aragon.unam.mx	" },  grupo:"	2209	",lunes:"	10:00	<br>	11:30	", martes:"		<br>		",miercoles:"	10:00	<br>	11:30	",jueves:"		<br>		",viernes:"	10:00	<br>	11:30	", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	0063	", materia:"	CALCULO VECTORIAL	", profesor:{ nombre:"	GONZALEZ HERNANDEZ GERARDO	", correo:"	gerardogonzalezgoh@aragon.unam.mx	" },  grupo:"	2209	",lunes:"	07:00	<br>	08:30	", martes:"		<br>		",miercoles:"	07:00	<br>	08:30	",jueves:"		<br>		",viernes:"	07:00	<br>	08:30	", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1209	", materia:"	COMUNICACION	", profesor:{ nombre:"	PEREZ VALDES JOEL ALFREDO	", correo:"	joelperezpev@aragon.unam.mx	" },  grupo:"	2209	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br> A216	" },
{ clv:"	1210	", materia:"	EMPRENDIMIENTO 1	", profesor:{ nombre:"	MONDRAGON ESCOBAR ALFREDO	", correo:"	alfredomondragontg8@aragon.unam.mx	" },  grupo:"	2209	",lunes:"	13:00	<br>	14:20	", martes:"		<br>		",miercoles:"	13:00	<br>	14:20	",jueves:"		<br>		",viernes:"	13:00	<br>	14:20	", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	SANCHEZ HERNANDEZ MIGUEL ANGEL	", correo:"	miguelsanchezt32@aragon.unam.mx	" },  grupo:"	2209	",lunes:"	11:30	<br>	13:00	", martes:"		<br>		",miercoles:"	11:30	<br>	13:00	",jueves:"		<br>		",viernes:"	11:30	<br>	13:00	", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	MONDRAGON ESCOBAR ALFREDO	", correo:"	alfredomondragontg8@aragon.unam.mx	" },  grupo:"	2209	",lunes:"	08:30	<br>	10:00	", martes:"		<br>		",miercoles:"	08:30	<br>	10:00	",jueves:"		<br>		",viernes:"	08:30	<br>	10:00	", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A211	" },
{ clv:"	0062	", materia:"	ALGEBRA LINEAL	", profesor:{ nombre:"	ORTIZ CORDERO GABRIEL	", correo:"	gabrielortizoic@aragon.unam.mx	" },  grupo:"	2210	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A506	" },
{ clv:"	0063	", materia:"	CALCULO VECTORIAL	", profesor:{ nombre:"	PEREZ GUZMAN ALEJANDRO	", correo:"	alejandropereze9@aragon.unam.mx	" },  grupo:"	2210	",lunes:"	13:00	<br>	15:00	", martes:"		<br>		",miercoles:"	13:00	<br>	15:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A504	" },
{ clv:"	1209	", materia:"	COMUNICACION	", profesor:{ nombre:"	MONDRAGON ESCOBAR ALFREDO	", correo:"	alfredomondragontg8@aragon.unam.mx	" },  grupo:"	2210	",lunes:"	11:30	<br>	12:50	", martes:"		<br>		",miercoles:"	11:30	<br>	12:50	",jueves:"		<br>		",viernes:"	11:30	<br>	12:50	", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	1210	", materia:"	EMPRENDIMIENTO 1	", profesor:{ nombre:"	GARCIA VILLANUEVA MA. DEL PILAR	", correo:"	magarciap9@aragon.unam.mx	" },  grupo:"	2210	",lunes:"	08:00	<br>	10:00	", martes:"		<br>		",miercoles:"	08:00	<br>	10:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br>A506	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	PEÑALOZA ROMERO ERNESTO	", correo:"	ernestopenalozaffa@aragon.unam.mx	" },  grupo:"	2210	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	CANDELARIO ALAVEZ JORGE LUIS	", correo:"	jorgecandelariocaa@aragon.unam.mx	" },  grupo:"	2210	",lunes:"		<br>		", martes:"	09:00	<br>	10:30	",miercoles:"		<br>		",jueves:"	09:00	<br>	10:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	SANCHEZ SANCHEZ VICTOR MANUEL	", correo:"	victorsanchez27@aragon.unam.mx	" },  grupo:"	2211	",lunes:"	11:30	<br>	12:50	", martes:"		<br>		",miercoles:"	11:30	<br>	12:50	",jueves:"		<br>		",viernes:"	11:30	<br>	12:50	", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	ABURTO CAMACHO BLANCA PAMELA	", correo:"	blancaaburto6c4@aragon.unam.mx	" },  grupo:"	2211	",lunes:"	10:30	<br>	12:00	", martes:"		<br>		",miercoles:"	10:30	<br>	12:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11201	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	ABURTO CAMACHO BLANCA PAMELA	", correo:"	blancaaburto6c4@aragon.unam.mx	" },  grupo:"	2212	",lunes:"		<br>		", martes:"	10:30	<br>	12:00	",miercoles:"		<br>		",jueves:"	10:30	<br>	12:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8121	" }

    ] },
    { nombre:"SEGUNDO SEMESTRE VESPERTINO", materias:[
        { clv:"	0062	", materia:"	ALGEBRA LINEAL	", profesor:{ nombre:"	SUAREZ HERRERA ALEJANDRO	", correo:"	alejandrosuarezsuh@aragon.unam.mx	" },  grupo:"	2257	",lunes:"		<br>		", martes:"	13:00	<br>	15:15	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:15	",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br> A211	" },
{ clv:"	0063	", materia:"	CALCULO VECTORIAL	", profesor:{ nombre:"	SANCHEZ MORALES VICTOR MANUEL	", correo:"	victorsanchezkd6@aragon.unam.mx	" },  grupo:"	2257	",lunes:"		<br>		", martes:"	15:45	<br>	18:00	",miercoles:"		<br>		",jueves:"	15:45	<br>	18:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1209	", materia:"	COMUNICACION	", profesor:{ nombre:"	ISLAS HERNANDEZ CLARA YAHAIRA	", correo:"	yahairaislasv6@aragon.unam.mx	" },  grupo:"	2257	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1210	", materia:"	EMPRENDIMIENTO 1	", profesor:{ nombre:"	COLUNGA VAZQUEZ MATILDE	", correo:"	matildecolungacov@aragon.unam.mx	" },  grupo:"	2257	",lunes:"	17:30	<br>	18:50	", martes:"		<br>		",miercoles:"	17:30	<br>	18:50	",jueves:"		<br>		",viernes:"	17:30	<br>	18:50	", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>		A211	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	RAMOS MARQUEZ JUAN CARLOS	", correo:"	juanramosram@aragon.unam.mx	" },  grupo:"	2257	",lunes:"		<br>		", martes:"	20:00	<br>	22:00	",miercoles:"		<br>		",jueves:"	20:00	<br>	22:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	VELASCO AGUSTIN AARON	", correo:"	aaronvelascovea@aragon.unam.mx	" },  grupo:"	2257	",lunes:"	19:00	<br>	20:30	", martes:"		<br>		",miercoles:"	19:00	<br>	20:30	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	0062	", materia:"	ALGEBRA LINEAL	", profesor:{ nombre:"	SOLIS ALCANTAR EVERARDO	", correo:"	everardosolisr0@aragon.unam.mx	" },  grupo:"	2258	",lunes:"	16:00	<br>	17:30	", martes:"		<br>		",miercoles:"	16:00	<br>	17:30	",jueves:"		<br>		",viernes:"	16:00	<br>	17:30	", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	0063	", materia:"	CALCULO VECTORIAL	", profesor:{ nombre:"	POR ASIGNAR	", correo:"	#N/D	" },  grupo:"	2258	",lunes:"	13:00	<br>	14:30	", martes:"		<br>		",miercoles:"	13:00	<br>	14:30	",jueves:"		<br>		",viernes:"	13:00	<br>	14:30	", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	1209	", materia:"	COMUNICACION	", profesor:{ nombre:"	ALBA VILLA BELEN ANAID	", correo:"	belenalba749@aragon.unam.mx	" },  grupo:"	2258	",lunes:"		<br>		", martes:"	19:00	<br>	21:00	",miercoles:"		<br>		",jueves:"	19:00	<br>	21:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	1210	", materia:"	EMPRENDIMIENTO 1	", profesor:{ nombre:"	COLUNGA VAZQUEZ MATILDE	", correo:"	matildecolungacov@aragon.unam.mx	" },  grupo:"	2258	",lunes:"	19:00	<br>	20:20	", martes:"		<br>		",miercoles:"	19:00	<br>	20:20	",jueves:"		<br>		",viernes:"	19:00	<br>	20:20	", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	SANCHEZ SANCHEZ VICTOR MANUEL	", correo:"	victorsanchez27@aragon.unam.mx	" },  grupo:"	2258	",lunes:"	14:40	<br>	16:00	", martes:"		<br>		",miercoles:"	14:40	<br>	16:00	",jueves:"		<br>		",viernes:"	14:40	<br>	16:00	", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	ALBA VILLA BELEN ANAID	", correo:"	belenalba749@aragon.unam.mx	" },  grupo:"	2258	",lunes:"		<br>		", martes:"	17:00	<br>	18:30	",miercoles:"		<br>		",jueves:"	17:00	<br>	18:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	0062	", materia:"	ALGEBRA LINEAL	", profesor:{ nombre:"	SOLIS ALCANTAR EVERARDO	", correo:"	everardosolisr0@aragon.unam.mx	" },  grupo:"	2259	",lunes:"	19:00	<br>	20:30	", martes:"		<br>		",miercoles:"	19:00	<br>	20:30	",jueves:"		<br>		",viernes:"	19:00	<br>	20:30	", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	0063	", materia:"	CALCULO VECTORIAL	", profesor:{ nombre:"	RODRIGUEZ GARCIA ARTURO	", correo:"	arturorodriguez35@aragon.unam.mx	" },  grupo:"	2259	",lunes:"		<br>		", martes:"	20:00	<br>	22:00	",miercoles:"		<br>		",jueves:"	20:00	<br>	22:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	1209	", materia:"	COMUNICACION	", profesor:{ nombre:"	ALMANZAR VAZQUEZ MARIA GUADALUPE	", correo:"	guadalupealmanzar1a@aragon.unam.mx	" },  grupo:"	2259	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1210	", materia:"	EMPRENDIMIENTO 1	", profesor:{ nombre:"	COLUNGA VAZQUEZ MATILDE	", correo:"	matildecolungacov@aragon.unam.mx	" },  grupo:"	2259	",lunes:"	16:00	<br>	17:20	", martes:"		<br>		",miercoles:"	16:00	<br>	17:20	",jueves:"		<br>		",viernes:"	16:00	<br>	17:20	", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	CANDELARIO ALAVEZ JORGE LUIS	", correo:"	jorgecandelariocaa@aragon.unam.mx	" },  grupo:"	2259	",lunes:"		<br>		", martes:"	15:00	<br>	17:00	",miercoles:"		<br>		",jueves:"	15:00	<br>	17:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A507	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	VELASCO AGUSTIN AARON	", correo:"	aaronvelascovea@aragon.unam.mx	" },  grupo:"	2259	",lunes:"	17:30	<br>	19:00	", martes:"		<br>		",miercoles:"	17:30	<br>	19:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	0062	", materia:"	ALGEBRA LINEAL	", profesor:{ nombre:"	GONZALEZ BETANCOURT RAFAEL	", correo:"	rafaelgonzalezma2@aragon.unam.mx	" },  grupo:"	2260	",lunes:"	17:30	<br>	19:00	", martes:"		<br>		",miercoles:"	17:30	<br>	19:00	",jueves:"		<br>		",viernes:"	17:30	<br>	19:00	", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A214	" },
{ clv:"	0063	", materia:"	CALCULO VECTORIAL	", profesor:{ nombre:"	HERNANDEZ GALICIA SALOMON	", correo:"	salomongaliciar5@aragon.unam.mx	" },  grupo:"	2260	",lunes:"		<br>		", martes:"	17:30	<br>	19:45	",miercoles:"		<br>		",jueves:"	17:30	<br>	19:45	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	1209	", materia:"	COMUNICACION	", profesor:{ nombre:"	ALMANZAR VAZQUEZ MARIA GUADALUPE	", correo:"	guadalupealmanzar1a@aragon.unam.mx	" },  grupo:"	2260	",lunes:"		<br>		", martes:"	20:00	<br>	22:00	",miercoles:"		<br>		",jueves:"	20:00	<br>	22:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	1210	", materia:"	EMPRENDIMIENTO 1	", profesor:{ nombre:"	GUERRERO SANTAMARIA EFREN	", correo:"	efrenguerreroc91@aragon.unam.mx	" },  grupo:"	2260	",lunes:"	20:00	<br>	22:00	", martes:"		<br>		",miercoles:"	20:00	<br>	22:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	HERNANDEZ CABRERA JESUS	", correo:"	jesushernandezls7@aragon.unam.mx	" },  grupo:"	2260	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1211	", materia:"	TALLER DE CREATIVIDAD E INNOVACION	", profesor:{ nombre:"	CHIAPA MONROY CUAUHTEMOC	", correo:"	cuauhtemocchiapacim@aragon.unam.mx	" },  grupo:"	2260	",lunes:"		<br>		", martes:"	16:00	<br>	17:30	",miercoles:"		<br>		",jueves:"	16:00	<br>	17:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	1203	", materia:"	PROGRAMACION ORIENTADA A OBJETOS	", profesor:{ nombre:"	CANDELARIO ALAVEZ JORGE LUIS	", correo:"	jorgecandelariocaa@aragon.unam.mx	" },  grupo:"	2261	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A505	" }
    ] },

    { nombre:"TERCER SEMESTRE MATUTINO", materias:[
        { clv:"	1303	", materia:"	ECUACIONES DIFERENCIALES	", profesor:{ nombre:"	PEREZ GUZMAN ALEJANDRO	", correo:"	alejandropereze9@aragon.unam.mx	" },  grupo:"	2307	",lunes:"	11:00	<br>	13:00	", martes:"		<br>		",miercoles:"	11:00	<br>	13:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11202	" },
{ clv:"	0071	", materia:"	ELECTRICIDAD Y MAGNETISMO (L)	", profesor:{ nombre:"	SUAREZ HERRERA ALEJANDRO	", correo:"	alejandrosuarezsuh@aragon.unam.mx	" },  grupo:"	2307	",lunes:"		<br>		", martes:"	10:45	<br>	13:00	",miercoles:"		<br>		",jueves:"	10:45	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11203	" },
{ clv:"	1311	", materia:"	EMPRENDIMIENTO 2	", profesor:{ nombre:"	GARCIA VILLANUEVA MA. DEL PILAR	", correo:"	magarciap9@aragon.unam.mx	" },  grupo:"	2307	",lunes:"	10:00	<br>	12:00	", martes:"		<br>		",miercoles:"	10:00	<br>	12:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	0190	", materia:"	ESTRUCTURA DE DATOS	", profesor:{ nombre:"	BLANCO BAUTISTA ROBERTO	", correo:"	robertoblancoir4@aragon.unam.mx	" },  grupo:"	2307	",lunes:"	10:00	<br>	11:30	", martes:"		<br>		",miercoles:"	10:00	<br>	11:30	",jueves:"		<br>		",viernes:"	10:00	<br>	11:30	", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	0480	", materia:"	METODOS NUMERICOS	", profesor:{ nombre:"	BLANCO BAUTISTA ROBERTO	", correo:"	robertoblancoir4@aragon.unam.mx	" },  grupo:"	2307	",lunes:"	07:00	<br>	08:30	", martes:"		<br>		",miercoles:"	07:00	<br>	08:30	",jueves:"		<br>		",viernes:"	07:00	<br>	08:30	", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	0071	", materia:"	ELECTRICIDAD Y MAGNETISMO (L)	", profesor:{ nombre:"	HERNANDEZ LOPEZ SERGIO	", correo:"	sergiohernandezhel@aragon.unam.mx	" },  grupo:"	2308	",lunes:"	08:30	<br>	10:00	", martes:"		<br>		",miercoles:"	08:30	<br>	10:00	",jueves:"		<br>		",viernes:"	08:30	<br>	10:00	", sabado:"		<br>		", salon:"	A8118	" },
{ clv:"	1311	", materia:"	EMPRENDIMIENTO 2	", profesor:{ nombre:"	CASTRO DIAZ JOSE DANIEL	", correo:"	josecastrocad@aragon.unam.mx	" },  grupo:"	2308	",lunes:"	14:10	<br>	15:30	", martes:"		<br>		",miercoles:"	14:10	<br>	15:30	",jueves:"		<br>		",viernes:"	14:10	<br>	15:30	", sabado:"		<br>		", salon:"	A8120	" },
{ clv:"	0480	", materia:"	METODOS NUMERICOS	", profesor:{ nombre:"	BLANCO BAUTISTA ROBERTO	", correo:"	robertoblancoir4@aragon.unam.mx	" },  grupo:"	2308	",lunes:"	08:30	<br>	10:00	", martes:"		<br>		",miercoles:"	08:30	<br>	10:00	",jueves:"		<br>		",viernes:"	08:30	<br>	10:00	", sabado:"		<br>		", salon:"	A8117	" }
    ] },

    { nombre:"TERCER SEMESTRE VESPERTINO", materias:[
{ clv:"	1303	", materia:"	ECUACIONES DIFERENCIALES	", profesor:{ nombre:"	JUAREZ PALMA JOSE GIL	", correo:"	giljuarezb9@aragon.unam.mx	" },  grupo:"	2357	",lunes:"		<br>		", martes:"	15:15	<br>	17:30	",miercoles:"		<br>		",jueves:"	15:15	<br>	17:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	0071	", materia:"	ELECTRICIDAD Y MAGNETISMO (L)	", profesor:{ nombre:"	SEGURA RAUDA MINERVA	", correo:"	minervaseguraser@aragon.unam.mx	" },  grupo:"	2357	",lunes:"	16:00	<br>	17:30	", martes:"		<br>		",miercoles:"	16:00	<br>	17:30	",jueves:"		<br>		",viernes:"	16:00	<br>	17:30	", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	1311	", materia:"	EMPRENDIMIENTO 2	", profesor:{ nombre:"	GUTIERREZ CASTILLO ALMA ROSA	", correo:"	almagutierrez88@aragon.unam.mx	" },  grupo:"	2357	",lunes:"	17:30	<br>	18:50	", martes:"		<br>		",miercoles:"	17:30	<br>	18:50	",jueves:"		<br>		",viernes:"	17:30	<br>	18:50	", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	0190	", materia:"	ESTRUCTURA DE DATOS	", profesor:{ nombre:"	CRUZ LUEVANO BLANCA ESTELA	", correo:"	blancaluevanoq9@aragon.unam.mx	" },  grupo:"	2357	",lunes:"		<br>		", martes:"	19:50	<br>	21:50	",miercoles:"		<br>		",jueves:"	19:50	<br>	21:50	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8118	" },
{ clv:"	0480	", materia:"	METODOS NUMERICOS	", profesor:{ nombre:"	GONZALEZ BETANCOURT RAFAEL	", correo:"	rafaelgonzalezma2@aragon.unam.mx	" },  grupo:"	2357	",lunes:"	19:00	<br>	20:30	", martes:"		<br>		",miercoles:"	19:00	<br>	20:30	",jueves:"		<br>		",viernes:"	19:00	<br>	20:30	", sabado:"		<br>		", salon:"	A11204	" },
{ clv:"	1303	", materia:"	ECUACIONES DIFERENCIALES	", profesor:{ nombre:"	JUAREZ PALMA JOSE GIL	", correo:"	giljuarezb9@aragon.unam.mx	" },  grupo:"	2359	",lunes:"		<br>		", martes:"	17:30	<br>	19:45	",miercoles:"		<br>		",jueves:"	17:30	<br>	19:45	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	0071	", materia:"	ELECTRICIDAD Y MAGNETISMO (L)	", profesor:{ nombre:"	PICCINELLI BOCCHI GABRIELLA	", correo:"	gabriellapiccinelli30@aragon.unam.mx	" },  grupo:"	2359	",lunes:"	13:00	<br>	14:30	", martes:"		<br>		",miercoles:"	13:00	<br>	14:30	",jueves:"		<br>		",viernes:"	13:00	<br>	14:30	", sabado:"		<br>		", salon:"	A8118	" },
{ clv:"	0190	", materia:"	ESTRUCTURA DE DATOS	", profesor:{ nombre:"	CRUZ LUEVANO BLANCA ESTELA	", correo:"	blancaluevanoq9@aragon.unam.mx	" },  grupo:"	2359	",lunes:"	19:00	<br>	20:20	", martes:"		<br>		",miercoles:"	19:00	<br>	20:20	",jueves:"		<br>		",viernes:"	19:00	<br>	20:20	", sabado:"		<br>		", salon:"	A8119	" }
    ] },
    { nombre:"CUARTO SEMESTRE MATUTINO", materias:[
        { clv:"	1417	", materia:"	BASES DE DATOS 1	", profesor:{ nombre:"	HERNANDEZ CABRERA JESUS	", correo:"	jesushernandezls7@aragon.unam.mx	" },  grupo:"	2407	",lunes:"	08:40	<br>	10:00	", martes:"		<br>		",miercoles:"	08:40	<br>	10:00	",jueves:"		<br>		",viernes:"	08:40	<br>	10:00	", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	VERDE CRUZ ABEL	", correo:"	abelverde53@aragon.unam.mx	" },  grupo:"	2407	",lunes:"		<br>		", martes:"	13:15	<br>	15:15	",miercoles:"		<br>		",jueves:"	13:15	<br>	15:15	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	1418	", materia:"	EMPRENDIMIENTO 3	", profesor:{ nombre:"	PEREZ VALDES JOEL ALFREDO	", correo:"	joelperezpev@aragon.unam.mx	" },  grupo:"	2407	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A212	" },
{ clv:"	1419	", materia:"	MATEMATICAS DISCRETAS	", profesor:{ nombre:"	OLIVER MORALES CARLOS	", correo:"	carlosolivers3@aragon.unam.mx	" },  grupo:"	2407	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	0712	", materia:"	PROBABILIDAD Y ESTADISTICA	", profesor:{ nombre:"	HERNANDEZ LOPEZ SERGIO	", correo:"	sergiohernandezhel@aragon.unam.mx	" },  grupo:"	2407	",lunes:"	07:00	<br>	08:30	", martes:"		<br>		",miercoles:"	07:00	<br>	08:30	",jueves:"		<br>		",viernes:"	07:00	<br>	08:30	", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A211	" },
{ clv:"	1417	", materia:"	BASES DE DATOS 1	", profesor:{ nombre:"	CAMACHO ALVAREZ JUAN CARLOS	", correo:"	juancamachocaa@aragon.unam.mx	" },  grupo:"	2408	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	CCSAL1	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	VIEYRA REBOYO LUIS ARMANDO	", correo:"	luisvieyra26@aragon.unam.mx	" },  grupo:"	2408	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	1418	", materia:"	EMPRENDIMIENTO 3	", profesor:{ nombre:"	GARCIA VILLANUEVA MA. DEL PILAR	", correo:"	magarciap9@aragon.unam.mx	" },  grupo:"	2408	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1419	", materia:"	MATEMATICAS DISCRETAS	", profesor:{ nombre:"	OLIVER MORALES CARLOS	", correo:"	carlosolivers3@aragon.unam.mx	" },  grupo:"	2408	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	0712	", materia:"	PROBABILIDAD Y ESTADISTICA	", profesor:{ nombre:"	TORRES TORRES FAUSTO	", correo:"	faustotorres1k8@aragon.unam.mx	" },  grupo:"	2408	",lunes:"		<br>		", martes:"	13:00	<br>	15:15	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:15	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	1417	", materia:"	BASES DE DATOS 1	", profesor:{ nombre:"	ORDOÑEZ ROSALES MARTIN	", correo:"	martinordonez7e1@aragon.unam.mx	" },  grupo:"	2409	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	VERDE CRUZ ABEL	", correo:"	abelverde53@aragon.unam.mx	" },  grupo:"	2409	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1418	", materia:"	EMPRENDIMIENTO 3	", profesor:{ nombre:"	GUTIERREZ CASTILLO ALMA ROSA	", correo:"	almagutierrez88@aragon.unam.mx	" },  grupo:"	2409	",lunes:"	08:30	<br>	09:50	", martes:"		<br>		",miercoles:"	08:30	<br>	09:50	",jueves:"		<br>		",viernes:"	08:30	<br>	09:50	", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	1419	", materia:"	MATEMATICAS DISCRETAS	", profesor:{ nombre:"	OLIVER MORALES CARLOS	", correo:"	carlosolivers3@aragon.unam.mx	" },  grupo:"	2409	",lunes:"	07:00	<br>	08:30	", martes:"		<br>		",miercoles:"	07:00	<br>	08:30	",jueves:"		<br>		",viernes:"	07:00	<br>	08:30	", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	0712	", materia:"	PROBABILIDAD Y ESTADISTICA	", profesor:{ nombre:"	POR ASIGNAR	", correo:"	#N/D	" },  grupo:"	2409	",lunes:"	11:30	<br>	13:00	", martes:"		<br>		",miercoles:"	11:30	<br>	13:00	",jueves:"		<br>		",viernes:"	11:30	<br>	13:00	", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1417	", materia:"	BASES DE DATOS 1	", profesor:{ nombre:"	MENDOZA GONZALEZ OMAR	", correo:"	omarmendoza564@aragon.unam.mx	" },  grupo:"	2410	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	VERDE CRUZ ABEL	", correo:"	abelverde53@aragon.unam.mx	" },  grupo:"	2410	",lunes:"	08:40	<br>	10:00	", martes:"		<br>		",miercoles:"	08:40	<br>	10:00	",jueves:"		<br>		",viernes:"	08:40	<br>	10:00	", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	1418	", materia:"	EMPRENDIMIENTO 3	", profesor:{ nombre:"	PEREZ VALDES JOEL ALFREDO	", correo:"	joelperezpev@aragon.unam.mx	" },  grupo:"	2410	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	1419	", materia:"	MATEMATICAS DISCRETAS	", profesor:{ nombre:"	VIEYRA REBOYO LUIS ARMANDO	", correo:"	luisvieyra26@aragon.unam.mx	" },  grupo:"	2410	",lunes:"	07:00	<br>	08:30	", martes:"		<br>		",miercoles:"	07:00	<br>	08:30	",jueves:"		<br>		",viernes:"	07:00	<br>	08:30	", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A216	" },
{ clv:"	0712	", materia:"	PROBABILIDAD Y ESTADISTICA	", profesor:{ nombre:"	POR ASIGNAR	", correo:"	#N/D	" },  grupo:"	2410	",lunes:"		<br>		", martes:"	13:15	<br>	15:30	",miercoles:"		<br>		",jueves:"	13:15	<br>	15:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A315	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	ORTEGA NAVA CARLOS FERNANDO	", correo:"	fernandonava16@aragon.unam.mx	" },  grupo:"	2411	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br>A504	" }
    ] },
       { nombre:"CUARTO SEMESTRE VESPERTINO", materias:[
        { clv:"	1417	", materia:"	BASES DE DATOS 1	", profesor:{ nombre:"	CANTO GALLO RAFAEL	", correo:"	rafaelgallos4@aragon.unam.mx	" },  grupo:"	2457	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	CCSAL1	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	PATIÑO RODRIGUEZ RAMON	", correo:"	ramonrodriguezn9@aragon.unam.mx	" },  grupo:"	2457	",lunes:"	19:00	<br>	20:30	", martes:"		<br>		",miercoles:"	19:00	<br>	20:30	",jueves:"		<br>		",viernes:"	19:00	<br>	20:30	", sabado:"		<br>		", salon:"	A506	" },
{ clv:"	1418	", materia:"	EMPRENDIMIENTO 3	", profesor:{ nombre:"	GUERRERO SANTAMARIA EFREN	", correo:"	efrenguerreroc91@aragon.unam.mx	" },  grupo:"	2457	",lunes:"		<br>		", martes:"	20:00	<br>	22:00	",miercoles:"		<br>		",jueves:"	20:00	<br>	22:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1419	", materia:"	MATEMATICAS DISCRETAS	", profesor:{ nombre:"	GONZALEZ BETANCOURT RAFAEL	", correo:"	rafaelgonzalezma2@aragon.unam.mx	" },  grupo:"	2457	",lunes:"	20:30	<br>	22:00	", martes:"		<br>		",miercoles:"	20:30	<br>	22:00	",jueves:"		<br>		",viernes:"	20:30	<br>	22:00	", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	0712	", materia:"	PROBABILIDAD Y ESTADISTICA	", profesor:{ nombre:"	PELCASTRE RAMIREZ GLORIA SAMANTHA	", correo:"	samanthapelcastrei3@aragon.unam.mx	" },  grupo:"	2457	",lunes:"	17:30	<br>	19:00	", martes:"		<br>		",miercoles:"	17:30	<br>	19:00	",jueves:"		<br>		",viernes:"	17:30	<br>	19:00	", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	1417	", materia:"	BASES DE DATOS 1	", profesor:{ nombre:"	GERMAN ROSAS CESAR FRANCISCO	", correo:"	cesargermanx9@aragon.unam.mx	" },  grupo:"	2458	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	07:00	<br>	11:00	", salon:"	VIRTUAL	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	ALVAREZ SORIANO MANUEL ALEJANDRO	", correo:"	alejandroalvarez17@aragon.unam.mx	" },  grupo:"	2458	",lunes:"	19:00	<br>	20:30	", martes:"		<br>		",miercoles:"	19:00	<br>	20:30	",jueves:"		<br>		",viernes:"	19:00	<br>	20:30	", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1418	", materia:"	EMPRENDIMIENTO 3	", profesor:{ nombre:"	CERVANTES PATIÑO MOISES	", correo:"	moisescervantes5d4@aragon.unam.mx	" },  grupo:"	2458	",lunes:"	20:30	<br>	21:50	", martes:"		<br>		",miercoles:"	20:30	<br>	21:50	",jueves:"		<br>		",viernes:"	20:30	<br>	21:50	", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	1419	", materia:"	MATEMATICAS DISCRETAS	", profesor:{ nombre:"	GONZALEZ BETANCOURT RAFAEL	", correo:"	rafaelgonzalezma2@aragon.unam.mx	" },  grupo:"	2458	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	0712	", materia:"	PROBABILIDAD Y ESTADISTICA	", profesor:{ nombre:"	PELCASTRE RAMIREZ GLORIA SAMANTHA	", correo:"	samanthapelcastrei3@aragon.unam.mx	" },  grupo:"	2458	",lunes:"	16:00	<br>	17:30	", martes:"		<br>		",miercoles:"	16:00	<br>	17:30	",jueves:"		<br>		",viernes:"	16:00	<br>	17:30	", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1417	", materia:"	BASES DE DATOS 1	", profesor:{ nombre:"	SOBERANES JAIME ROBERTO MISAEL	", correo:"	misaelsoberanesr8@aragon.unam.mx	" },  grupo:"	2459	",lunes:"		<br>		", martes:"	20:00	<br>	22:00	",miercoles:"		<br>		",jueves:"	20:00	<br>	22:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	VERDE CRUZ ABEL	", correo:"	abelverde53@aragon.unam.mx	" },  grupo:"	2459	",lunes:"		<br>		", martes:"	17:45	<br>	20:00	",miercoles:"		<br>		",jueves:"	17:45	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	1418	", materia:"	EMPRENDIMIENTO 3	", profesor:{ nombre:"	REYES TECONTERO NORMA	", correo:"	normareyesi8@aragon.unam.mx	" },  grupo:"	2459	",lunes:"	19:00	<br>	21:00	", martes:"		<br>		",miercoles:"	19:00	<br>	21:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	1419	", materia:"	MATEMATICAS DISCRETAS	", profesor:{ nombre:"	RODRIGUEZ GARCIA ARTURO	", correo:"	arturorodriguez35@aragon.unam.mx	" },  grupo:"	2459	",lunes:"	16:00	<br>	17:30	", martes:"		<br>		",miercoles:"	16:00	<br>	17:30	",jueves:"		<br>		",viernes:"	16:00	<br>	17:30	", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	0712	", materia:"	PROBABILIDAD Y ESTADISTICA	", profesor:{ nombre:"	PEREZ GUZMAN ALEJANDRO	", correo:"	alejandropereze9@aragon.unam.mx	" },  grupo:"	2459	",lunes:"	17:30	<br>	19:00	", martes:"		<br>		",miercoles:"	17:30	<br>	19:00	",jueves:"		<br>		",viernes:"	17:30	<br>	19:00	", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	1417	", materia:"	BASES DE DATOS 1	", profesor:{ nombre:"	SANCHEZ HERNANDEZ MIGUEL ANGEL	", correo:"	miguelsanchezt32@aragon.unam.mx	" },  grupo:"	2460	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	1522	", materia:"	DISPOSITIVOS ELECTRONICOS (L)	", profesor:{ nombre:"	LOPEZ CARRETO JUAN MANUEL	", correo:"	manuelcarreto50@aragon.unam.mx	" },  grupo:"	2460	",lunes:"	20:00	<br>	21:20	", martes:"		<br>		",miercoles:"	20:00	<br>	21:20	",jueves:"		<br>		",viernes:"	20:00	<br>	21:20	", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br>Centro de Capacitación ICA	" },
{ clv:"	1418	", materia:"	EMPRENDIMIENTO 3	", profesor:{ nombre:"	REYES TECONTERO NORMA	", correo:"	normareyesi8@aragon.unam.mx	" },  grupo:"	2460	",lunes:"	17:00	<br>	19:00	", martes:"		<br>		",miercoles:"	17:00	<br>	19:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1419	", materia:"	MATEMATICAS DISCRETAS	", profesor:{ nombre:"	RODRIGUEZ GARCIA ARTURO	", correo:"	arturorodriguez35@aragon.unam.mx	" },  grupo:"	2460	",lunes:"	14:30	<br>	16:00	", martes:"		<br>		",miercoles:"	14:30	<br>	16:00	",jueves:"		<br>		",viernes:"	14:30	<br>	16:00	", sabado:"		<br>		", salon:"	A215	" },
{ clv:"	0712	", materia:"	PROBABILIDAD Y ESTADISTICA	", profesor:{ nombre:"	MORALES GONZALEZ JORGE CARLOS	", correo:"	jorgegonzalez71@aragon.unam.mx	" },  grupo:"	2460	",lunes:"	13:00	<br>	14:30	", martes:"		<br>		",miercoles:"	13:00	<br>	14:30	",jueves:"		<br>		",viernes:"	13:00	<br>	14:30	", sabado:"		<br>		", salon:"	A507	" }
       ] },
    { nombre:"QUINTO SEMESTRE MATUTINO", materias:[
        { clv:"	1503	", materia:"	ADMINISTRACION DE PROYECTOS	", profesor:{ nombre:"	GONZALEZ AYALA LUIS ENRIQUE	", correo:"	enriqueayala51@aragon.unam.mx	" },  grupo:"	2507	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	07:00	<br>	11:00	", salon:"	VIRTUAL	" },
{ clv:"	1500	", materia:"	DISEÑO Y ANALISIS DE ALGORITMOS	", profesor:{ nombre:"	SALDAÑA ALDANA HECTOR	", correo:"	hectorsaldanaa5@aragon.unam.mx	" },  grupo:"	2507	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br> A205	" },
{ clv:"	1521	", materia:"	DISEÑO LOGICO (L)	", profesor:{ nombre:"	VILLANUEVA ORTEGA JUAN ANTONIO	", correo:"	juanvillanuevavio@aragon.unam.mx	" },  grupo:"	2507	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11202	" },
{ clv:"	0442	", materia:"	LENGUAJES FORMALES-AUTOMATAS	", profesor:{ nombre:"	OLIVER MORALES CARLOS	", correo:"	carlosolivers3@aragon.unam.mx	" },  grupo:"	2507	",lunes:"	08:40	<br>	10:00	", martes:"		<br>		",miercoles:"	08:40	<br>	10:00	",jueves:"		<br>		",viernes:"	08:40	<br>	10:00	", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	1504	", materia:"	PROGRAMACION WEB 1	", profesor:{ nombre:"	VERDUZCO RODRIGUEZ MARIANA	", correo:"	marianaverduzco89@aragon.unam.mx	" },  grupo:"	2507	",lunes:"	13:00	<br>	14:20	", martes:"		<br>		",miercoles:"	13:00	<br>	14:20	",jueves:"		<br>		",viernes:"	13:00	<br>	14:20	", sabado:"		<br>		", salon:"	CCSAL2	" },
{ clv:"	1500	", materia:"	DISEÑO Y ANALISIS DE ALGORITMOS	", profesor:{ nombre:"	PEREZ SANCHEZ HIRAM EMMANUEL	", correo:"	hiramperezl0@aragon.unam.mx	" },  grupo:"	2508	",lunes:"	07:00	<br>	08:30	", martes:"		<br>		",miercoles:"	07:00	<br>	08:30	",jueves:"		<br>		",viernes:"	07:00	<br>	08:30	", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1521	", materia:"	DISEÑO LOGICO (L)	", profesor:{ nombre:"	RAMIREZ CRUZ JOSE LUIS	", correo:"	luisramirezm0@aragon.unam.mx	" },  grupo:"	2508	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11201	" },
{ clv:"	1504	", materia:"	PROGRAMACION WEB 1	", profesor:{ nombre:"	ORTIZ JIMENEZ MARIA ELENA	", correo:"	mariaortizq7@aragon.unam.mx	" },  grupo:"	2508	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br> CLOUD	" }
    ] },
    { nombre:"QUINTO SEMESTRE VESPERTINO", materias:[
        { clv:"	1503	", materia:"	ADMINISTRACION DE PROYECTOS	", profesor:{ nombre:"	GONZALEZ AYALA LUIS ENRIQUE	", correo:"	enriqueayala51@aragon.unam.mx	" },  grupo:"	2557	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	11:00	<br>	15:00	", salon:"	VIRTUAL	" },
{ clv:"	1500	", materia:"	DISEÑO Y ANALISIS DE ALGORITMOS	", profesor:{ nombre:"	SANCHEZ SANCHEZ VICTOR MANUEL	", correo:"	victorsanchez27@aragon.unam.mx	" },  grupo:"	2557	",lunes:"	13:00	<br>	14:30	", martes:"		<br>		",miercoles:"	13:00	<br>	14:30	",jueves:"		<br>		",viernes:"	13:00	<br>	14:30	", sabado:"		<br>		", salon:"	A8121	" },
{ clv:"	1521	", materia:"	DISEÑO LOGICO (L)	", profesor:{ nombre:"	LOPEZ CARRETO JUAN MANUEL	", correo:"	manuelcarreto50@aragon.unam.mx	" },  grupo:"	2557	",lunes:"	18:40	<br>	20:00	", martes:"		<br>		",miercoles:"	18:40	<br>	20:00	",jueves:"		<br>		",viernes:"	18:40	<br>	20:00	", sabado:"		<br>		", salon:"	A11203	" },
{ clv:"	0442	", materia:"	LENGUAJES FORMALES-AUTOMATAS	", profesor:{ nombre:"	JUAREZ ROBLES ELIZABETH	", correo:"	elizabethjuarezjur@aragon.unam.mx	" },  grupo:"	2557	",lunes:"	19:00	<br>	21:15	", martes:"		<br>		",miercoles:"	19:00	<br>	21:15	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11205	" },
{ clv:"	1504	", materia:"	PROGRAMACION WEB 1	", profesor:{ nombre:"	VELASCO AGUSTIN AARON	", correo:"	aaronvelascovea@aragon.unam.mx	" },  grupo:"	2557	",lunes:"		<br>		", martes:"	15:00	<br>	17:00	",miercoles:"		<br>		",jueves:"	15:00	<br>	17:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	CCSAL7	" },
{ clv:"	1503	", materia:"	ADMINISTRACION DE PROYECTOS	", profesor:{ nombre:"	REYES CRUZ ANA CLAUDIA	", correo:"	claudiacruze8@aragon.unam.mx	" },  grupo:"	2558	",lunes:"	17:00	<br>	19:00	", martes:"		<br>		",miercoles:"	17:00	<br>	19:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11204	" },
{ clv:"	1500	", materia:"	DISEÑO Y ANALISIS DE ALGORITMOS	", profesor:{ nombre:"	QUIROZ ALMARAZ SERGIO	", correo:"	sergioquirozhs3@aragon.unam.mx	" },  grupo:"	2558	",lunes:"	16:00	<br>	17:30	", martes:"		<br>		",miercoles:"	16:00	<br>	17:30	",jueves:"		<br>		",viernes:"	16:00	<br>	17:30	", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A8121	" },
{ clv:"	1504	", materia:"	PROGRAMACION WEB 1	", profesor:{ nombre:"	PEREZ PAZ EDUARDO	", correo:"	eduardoperez53@aragon.unam.mx	" },  grupo:"	2558	",lunes:"	14:30	<br>	16:00	", martes:"		<br>		",miercoles:"	14:30	<br>	16:00	",jueves:"		<br>		",viernes:"	14:30	<br>	16:00	", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1521	", materia:"	DISEÑO LOGICO (L)	", profesor:{ nombre:"	GONZALEZ MAXINEZ DAVID JAIME	", correo:"	davidmaxinezs2@aragon.unam.mx	" },  grupo:"	2559	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A504	" }
    ] },
    { nombre:"SEXTO SEMESTRE MATUTINO", materias:[
        { clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	GUTIERREZ OROZCO RICARDO ARTURO	", correo:"	ricardogutierrezs0@aragon.unam.mx	" },  grupo:"	2607	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	BERNAL DIAZ ARCELIA	", correo:"	arceliabernal83@aragon.unam.mx	" },  grupo:"	2607	",lunes:"	08:40	<br>	10:00	", martes:"		<br>		",miercoles:"	08:40	<br>	10:00	",jueves:"		<br>		",viernes:"	08:40	<br>	10:00	", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	1605	", materia:"	INGENIERIA DE SOFTWARE	", profesor:{ nombre:"	GONZALEZ HERNANDEZ MARIA GABRIELA	", correo:"	gabrielagonzalezc7@aragon.unam.mx	" },  grupo:"	2607	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A507	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	VAZQUEZ MORALES RODOLFO	", correo:"	rodolfovazquezh6@aragon.unam.mx	" },  grupo:"	2607	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br> A214	A211	" },
{ clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	PEREZ MEDEL MARCELO	", correo:"	marcelomedelq7@aragon.unam.mx	" },  grupo:"	2608	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A506	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	GONZALEZ MAXINEZ DAVID JAIME	", correo:"	davidmaxinezs2@aragon.unam.mx	" },  grupo:"	2608	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1605	", materia:"	INGENIERIA DE SOFTWARE	", profesor:{ nombre:"	VERDUZCO RODRIGUEZ MARIANA	", correo:"	marianaverduzco89@aragon.unam.mx	" },  grupo:"	2608	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	GONZALEZ HERNANDEZ MARIA GABRIELA	", correo:"	gabrielagonzalezc7@aragon.unam.mx	" },  grupo:"	2608	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	SANCHEZ HERNANDEZ MIGUEL ANGEL	", correo:"	miguelsanchezt32@aragon.unam.mx	" },  grupo:"	2609	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	BERNAL DIAZ ARCELIA	", correo:"	arceliabernal83@aragon.unam.mx	" },  grupo:"	2609	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	1605	", materia:"	INGENIERIA DE SOFTWARE	", profesor:{ nombre:"	VERDUZCO RODRIGUEZ MARIANA	", correo:"	marianaverduzco89@aragon.unam.mx	" },  grupo:"	2609	",lunes:"	11:40	<br>	13:00	", martes:"		<br>		",miercoles:"	11:40	<br>	13:00	",jueves:"		<br>		",viernes:"	11:40	<br>	13:00	", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	VAZQUEZ MORALES RODOLFO	", correo:"	rodolfovazquezh6@aragon.unam.mx	" },  grupo:"	2609	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"	A11201	" },
{ clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	ORTIZ CORDERO GABRIEL	", correo:"	gabrielortizoic@aragon.unam.mx	" },  grupo:"	2610	",lunes:"	11:00	<br>	13:00	", martes:"		<br>		",miercoles:"	11:00	<br>	13:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A507	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	HERNANDEZ HERNANDEZ MARTIN	", correo:"	martinhernandez5u8@aragon.unam.mx	" },  grupo:"	2610	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1605	", materia:"	INGENIERIA DE SOFTWARE	", profesor:{ nombre:"	SANCHEZ SANCHEZ VICTOR MANUEL	", correo:"	victorsanchez27@aragon.unam.mx	" },  grupo:"	2610	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A507	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	ORTIZ CORDERO GABRIEL	", correo:"	gabrielortizoic@aragon.unam.mx	" },  grupo:"	2610	",lunes:"	13:00	<br>	15:00	", martes:"		<br>		",miercoles:"	13:00	<br>	15:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	ORDOÑEZ ROSALES MARTIN	", correo:"	martinordonez7e1@aragon.unam.mx	" },  grupo:"	2611	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	07:00	<br>	11:00	", salon:"	VIRTUAL	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	BERNAL DIAZ ARCELIA	", correo:"	arceliabernal83@aragon.unam.mx	" },  grupo:"	2611	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	ORTIZ CORDERO GABRIEL	", correo:"	gabrielortizoic@aragon.unam.mx	" },  grupo:"	2611	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A216	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	GONZALEZ MAXINEZ DAVID JAIME	", correo:"	davidmaxinezs2@aragon.unam.mx	" },  grupo:"	2612	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"	A11204	" },
{ clv:"	1521	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	ARELLANO RIVERA ESTEBAN	", correo:"	estebanriverac1@aragon.unam.mx	" },  grupo:"	2615	",lunes:"	11:00	<br>	13:00	", martes:"		<br>		",miercoles:"	11:00	<br>	13:00	",jueves:"		<br>		",viernes:"	<br>	", sabado:"		<br>		", salon:"<strong>GRUPO NUEVO</STRONG><br>	A11105	" }
    ] },
        { nombre:"SEXTO SEMESTRE VESPERTINO", materias:[
            { clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	ORTIZ CORDERO GABRIEL	", correo:"	gabrielortizoic@aragon.unam.mx	" },  grupo:"	2657	",lunes:"		<br>		", martes:"	15:00	<br>	17:00	",miercoles:"		<br>		",jueves:"	15:00	<br>	17:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A205	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	LOZANO MENDEZ EFREN	", correo:"	efrenlozanogg2@aragon.unam.mx	" },  grupo:"	2657	",lunes:"	13:00	<br>	15:00	", martes:"		<br>		",miercoles:"	13:00	<br>	15:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A205	" },
{ clv:"	1605	", materia:"	INGENIERIA DE SOFTWARE	", profesor:{ nombre:"	CAMACHO ALVAREZ JUAN CARLOS	", correo:"	juancamachocaa@aragon.unam.mx	" },  grupo:"	2657	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A507	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	ORTIZ CORDERO GABRIEL	", correo:"	gabrielortizoic@aragon.unam.mx	" },  grupo:"	2657	",lunes:"	15:00	<br>	17:00	", martes:"		<br>		",miercoles:"	15:00	<br>	17:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A205	" },
{ clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	ROMERO UGALDE MARTIN MANUEL	", correo:"	martinromerorou@aragon.unam.mx	" },  grupo:"	2658	",lunes:"	12:40	<br>	14:00	", martes:"		<br>		",miercoles:"	12:40	<br>	14:00	",jueves:"		<br>		",viernes:"	12:40	<br>	14:00	", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	LOZANO MENDEZ EFREN	", correo:"	efrenlozanogg2@aragon.unam.mx	" },  grupo:"	2658	",lunes:"	15:00	<br>	17:00	", martes:"		<br>		",miercoles:"	15:00	<br>	17:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1605	", materia:"	INGENIERIA DE SOFTWARE	", profesor:{ nombre:"	CRUZ LUEVANO BLANCA ESTELA	", correo:"	blancaluevanoq9@aragon.unam.mx	" },  grupo:"	2658	",lunes:"	17:40	<br>	19:00	", martes:"		<br>		",miercoles:"	17:40	<br>	19:00	",jueves:"		<br>		",viernes:"	17:40	<br>	19:00	", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A8121	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	AYALA PEÑA ESTEBAN	", correo:"	estebanayalapxa@aragon.unam.mx	" },  grupo:"	2658	",lunes:"		<br>		", martes:"	20:00	<br>	22:00	",miercoles:"		<br>		",jueves:"	20:00	<br>	22:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	GUTIERREZ OROZCO RICARDO ARTURO	", correo:"	ricardogutierrezs0@aragon.unam.mx	" },  grupo:"	2659	",lunes:"		<br>		", martes:"	20:00	<br>	22:00	",miercoles:"		<br>		",jueves:"	20:00	<br>	22:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	LOZANO MENDEZ EFREN	", correo:"	efrenlozanogg2@aragon.unam.mx	" },  grupo:"	2659	",lunes:"	17:00	<br>	19:00	", martes:"		<br>		",miercoles:"	17:00	<br>	19:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A507	" },
{ clv:"	1605	", materia:"	INGENIERIA DE SOFTWARE	", profesor:{ nombre:"	CRUZ LUEVANO BLANCA ESTELA	", correo:"	blancaluevanoq9@aragon.unam.mx	" },  grupo:"	2659	",lunes:"		<br>		", martes:"	17:45	<br>	19:45	",miercoles:"		<br>		",jueves:"	17:45	<br>	19:45	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A8118	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	GONZALEZ HERNANDEZ MARIA GABRIELA	", correo:"	gabrielagonzalezc7@aragon.unam.mx	" },  grupo:"	2659	",lunes:"		<br>		", martes:"	15:45	<br>	17:45	",miercoles:"		<br>		",jueves:"	15:45	<br>	17:45	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	0434	", materia:"	COMPILADORES	", profesor:{ nombre:"	SANCHEZ SANCHEZ VICTOR MANUEL	", correo:"	victorsanchez27@aragon.unam.mx	" },  grupo:"	2660	",lunes:"		<br>		", martes:"	15:45	<br>	18:00	",miercoles:"		<br>		",jueves:"	15:45	<br>	18:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	1604	", materia:"	DISEÑO DE SISTEMAS DIGITALES (L)	", profesor:{ nombre:"	HERNANDEZ CONTRERAS JUAN MANUEL	", correo:"	juanhernandez1z7@aragon.unam.mx	" },  grupo:"	2660	",lunes:"	15:00	<br>	16:20	", martes:"		<br>		",miercoles:"	15:00	<br>	16:20	",jueves:"		<br>		",viernes:"	15:00	<br>	16:20	", sabado:"		<br>		", salon:"	A504	" },
{ clv:"	1605	", materia:"	INGENIERIA DE SOFTWARE	", profesor:{ nombre:"	HERNANDEZ CABRERA JESUS	", correo:"	#N/D	" },  grupo:"	2660	",lunes:"	13:00	<br>	14:20	", martes:"		<br>		",miercoles:"	13:00	<br>	14:20	",jueves:"		<br>		",viernes:"	13:00	<br>	14:20	", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	0840	", materia:"	SISTEMAS OPERATIVOS	", profesor:{ nombre:"	GONZALEZ HERNANDEZ MARIA GABRIELA	", correo:"	gabrielagonzalezc7@aragon.unam.mx	" },  grupo:"	2660	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A212	" }
        ] },
    { nombre:"SÉPTIMO SEMESTRE MATUTINO", materias:[
{ clv:"	1800	", materia:"	MICROPROCESADOR.Y MICROCONTROLAD.(L)	", profesor:{ nombre:"	CANDELARIO ALAVEZ JORGE LUIS	", correo:"	jorgecandelariocaa@aragon.unam.mx	" },  grupo:"	2707	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	1718	", materia:"	PROGRAMACION WEB 2	", profesor:{ nombre:"	VELASCO AGUSTIN AARON	", correo:"	aaronvelascovea@aragon.unam.mx	" },  grupo:"	2707	",lunes:"	11:00	<br>	13:00	", martes:"		<br>		",miercoles:"	11:00	<br>	13:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	1719	", materia:"	REDES DE COMPUTADORAS 1 (L)	", profesor:{ nombre:"	GARCIA MONROY JOSE ANTONIO	", correo:"	josegarciay1@aragon.unam.mx	" },  grupo:"	2707	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	07:00	<br>	11:00	", salon:"	VIRTUAL	" },
{ clv:"	0789	", materia:"	SISTEMAS DE INFORMACION	", profesor:{ nombre:"	GUTIERREZ OROZCO RICARDO ARTURO	", correo:"	ricardogutierrezs0@aragon.unam.mx	" },  grupo:"	2707	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8118	" },
{ clv:"	1800	", materia:"	MICROPROCESADOR.Y MICROCONTROLAD.(L)	", profesor:{ nombre:"	LOZANO MENDEZ EFREN	", correo:"	efrenlozanogg2@aragon.unam.mx	" },  grupo:"	2708	",lunes:"	11:00	<br>	13:00	", martes:"		<br>		",miercoles:"	11:00	<br>	13:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8118	" },
{ clv:"	1718	", materia:"	PROGRAMACION WEB 2	", profesor:{ nombre:"	VELASCO AGUSTIN AARON	", correo:"	aaronvelascovea@aragon.unam.mx	" },  grupo:"	2708	",lunes:"	09:00	<br>	11:00	", martes:"		<br>		",miercoles:"	09:00	<br>	11:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8121	" },
{ clv:"	1719	", materia:"	REDES DE COMPUTADORAS 1 (L)	", profesor:{ nombre:"	QUINTERO CERVANTES JOSE MANUEL	", correo:"	josequinteroquc@aragon.unam.mx	" },  grupo:"	2708	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	1718	", materia:"	PROGRAMACION WEB 2	", profesor:{ nombre:"	ORTIZ JIMENEZ MARIA ELENA	", correo:"	mariaortizq7@aragon.unam.mx	" },  grupo:"	2709	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	CCSAL5	" }


    ] },
        { nombre:"SÉPTIMO SEMESTRE VESPERTINO", materias:[
{ clv:"	1800	", materia:"	MICROPROCESADOR.Y MICROCONTROLAD.(L)	", profesor:{ nombre:"	GONZALEZ MAXINEZ DAVID JAIME	", correo:"	davidmaxinezs2@aragon.unam.mx	" },  grupo:"	2757	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11202	" },
{ clv:"	1718	", materia:"	PROGRAMACION WEB 2	", profesor:{ nombre:"	CANDELARIO ALAVEZ JORGE LUIS	", correo:"	jorgecandelariocaa@aragon.unam.mx	" },  grupo:"	2757	",lunes:"	13:00	<br>	14:20	", martes:"		<br>		",miercoles:"	13:00	<br>	14:20	",jueves:"		<br>		",viernes:"	13:00	<br>	14:20	", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	1719	", materia:"	REDES DE COMPUTADORAS 1 (L)	", profesor:{ nombre:"	GARCIA GUZMAN ENRIQUE	", correo:"	enriquegarcia6u4@aragon.unam.mx	" },  grupo:"	2757	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8120	" },
{ clv:"	0789	", materia:"	SISTEMAS DE INFORMACION	", profesor:{ nombre:"	GUTIERREZ OROZCO RICARDO ARTURO	", correo:"	ricardogutierrezs0@aragon.unam.mx	" },  grupo:"	2757	",lunes:"	20:30	<br>	21:50	", martes:"		<br>		",miercoles:"	20:30	<br>	21:50	",jueves:"		<br>		",viernes:"	20:30	<br>	21:50	", sabado:"		<br>		", salon:"	A8121	" },
{ clv:"	1800	", materia:"	MICROPROCESADOR.Y MICROCONTROLAD.(L)	", profesor:{ nombre:"	OCAMPO ALVAREZ ARTURO	", correo:"	arturoocampo76@aragon.unam.mx	" },  grupo:"	2758	",lunes:"		<br>		", martes:"	16:00	<br>	18:00	",miercoles:"		<br>		",jueves:"	16:00	<br>	18:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8120	" }
        ] },
    { nombre:"OCTAVO SEMESTRE MATUTINO", materias:[
        { clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	MENDOZA GONZALEZ OMAR	", correo:"	omarmendoza564@aragon.unam.mx	" },  grupo:"	2807	",lunes:"	11:40	<br>	13:00	", martes:"		<br>		",miercoles:"	11:40	<br>	13:00	",jueves:"		<br>		",viernes:"	11:40	<br>	13:00	", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	FERIA VICTORIA MARIA ANGELICA	", correo:"	angelicaferiaf6@aragon.unam.mx	" },  grupo:"	2807	",lunes:"	09:00	<br>	11:00	", martes:"		<br>		",miercoles:"	09:00	<br>	11:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11202	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	CAMACHO ALVAREZ JUAN CARLOS	", correo:"	juancamachocaa@aragon.unam.mx	" },  grupo:"	2807	",lunes:"	13:00	<br>	14:30	", martes:"		<br>		",miercoles:"	13:00	<br>	14:30	",jueves:"		<br>		",viernes:"	13:00	<br>	14:30	", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	QUINTERO CERVANTES JOSE MANUEL	", correo:"	josequinteroquc@aragon.unam.mx	" },  grupo:"	2807	",lunes:"	07:00	<br>	09:00	", martes:"		<br>		",miercoles:"	07:00	<br>	09:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8121	" },
{ clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	JUAREZ ROBLES ELIZABETH	", correo:"	elizabethjuarezjur@aragon.unam.mx	" },  grupo:"	2808	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	VELASCO AGUSTIN AARON	", correo:"	aaronvelascovea@aragon.unam.mx	" },  grupo:"	2808	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	SANCHEZ HERNANDEZ MIGUEL ANGEL	", correo:"	miguelsanchezt32@aragon.unam.mx	" },  grupo:"	2808	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	GARCIA MONROY JOSE ANTONIO	", correo:"	josegarciay1@aragon.unam.mx	" },  grupo:"	2808	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	11:00	<br>	15:00	", salon:"	VIRTUAL	" },
{ clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	JUAREZ ROBLES ELIZABETH	", correo:"	elizabethjuarezjur@aragon.unam.mx	" },  grupo:"	2809	",lunes:"	11:00	<br>	13:00	", martes:"		<br>		",miercoles:"	11:00	<br>	13:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A506	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	ROMERO ANDALON JESUS ANGEL	", correo:"	jesusandalonsa@aragon.unam.mx	" },  grupo:"	2809	",lunes:"	07:00	<br>	09:00	", martes:"		<br>		",miercoles:"	07:00	<br>	09:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A507	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	CAMACHO ALVAREZ JUAN CARLOS	", correo:"	juancamachocaa@aragon.unam.mx	" },  grupo:"	2809	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	QUINTERO CERVANTES JOSE MANUEL	", correo:"	josequinteroquc@aragon.unam.mx	" },  grupo:"	2809	",lunes:"	09:00	<br>	11:00	", martes:"		<br>		",miercoles:"	09:00	<br>	11:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8120	" },
{ clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	CANTO GALLO RAFAEL	", correo:"	rafaelgallos4@aragon.unam.mx	" },  grupo:"	2810	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A205	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	GARIBAY PEDRAZA ALMA LILIA	", correo:"	almagaribayr7@aragon.unam.mx	" },  grupo:"	2810	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	SANCHEZ HERNANDEZ MIGUEL ANGEL	", correo:"	miguelsanchezt32@aragon.unam.mx	" },  grupo:"	2810	",lunes:"	08:30	<br>	10:00	", martes:"		<br>		",miercoles:"	08:30	<br>	10:00	",jueves:"		<br>		",viernes:"	08:30	<br>	10:00	", sabado:"		<br>		", salon:"	A214	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	PEREZ MUÑOZ ANTONIO GERARDO	", correo:"	gerardoperez23@aragon.unam.mx	" },  grupo:"	2811	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A11203	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	GARCIA GUZMAN ENRIQUE	", correo:"	enriquegarcia6u4@aragon.unam.mx	" },  grupo:"	2810	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"	<br>		", sabado:"		<br>		", salon:"	<strong>GRUPO NUEVO</STRONG><br>	A215	" }
    ] },
        { nombre:"OCTAVO SEMESTRE VESPERTINO", materias:[
            { clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	ORDOÑEZ ROSALES MARTIN	", correo:"	martinordonez7e1@aragon.unam.mx	" },  grupo:"	2857	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	11:00	<br>	15:00	", salon:"	VIRTUAL	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	VELASCO AGUSTIN AARON	", correo:"	aaronvelascovea@aragon.unam.mx	" },  grupo:"	2857	",lunes:"	13:00	<br>	15:00	", martes:"		<br>		",miercoles:"	13:00	<br>	15:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A506	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	SANCHEZ HERNANDEZ MIGUEL ANGEL	", correo:"	miguelsanchezt32@aragon.unam.mx	" },  grupo:"	2857	",lunes:"		<br>		", martes:"	17:00	<br>	19:00	",miercoles:"		<br>		",jueves:"	17:00	<br>	19:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	TORRES RODRIGUEZ GERARDO	", correo:"	gerardotorreswa@aragon.unam.mx	" },  grupo:"	2857	",lunes:"		<br>		", martes:"	19:00	<br>	21:00	",miercoles:"		<br>		",jueves:"	19:00	<br>	21:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	GERMAN ROSAS CESAR FRANCISCO	", correo:"	cesargermanx9@aragon.unam.mx	" },  grupo:"	2858	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	11:00	<br>	15:00	", salon:"	VIRTUAL	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	ROMERO ANDALON JESUS ANGEL	", correo:"	jesusandalonsa@aragon.unam.mx	" },  grupo:"	2858	",lunes:"	16:00	<br>	18:00	", martes:"		<br>		",miercoles:"	16:00	<br>	18:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A506" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	CAMACHO ALVAREZ JUAN CARLOS	", correo:"	juancamachocaa@aragon.unam.mx	" },  grupo:"	2858	",lunes:"	14:30	<br>	16:00	", martes:"		<br>		",miercoles:"	14:30	<br>	16:00	",jueves:"		<br>		",viernes:"	14:30	<br>	16:00	", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	TORRES RODRIGUEZ GERARDO	", correo:"	gerardotorreswa@aragon.unam.mx	" },  grupo:"	2858	",lunes:"	20:00	<br>	21:20	", martes:"		<br>		",miercoles:"	20:00	<br>	21:20	",jueves:"		<br>		",viernes:"	20:00	<br>	21:20	", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	JUAREZ ROBLES ELIZABETH	", correo:"	elizabethjuarezjur@aragon.unam.mx	" },  grupo:"	2859	",lunes:"	17:00	<br>	19:00	", martes:"		<br>		",miercoles:"	17:00	<br>	19:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	CCSAL8	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	VIDAL CASTRO RICARDO ADOLFO	", correo:"	ricardovidal79@aragon.unam.mx	" },  grupo:"	2859	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	07:00	<br>	11:00	", salon:"	VIRTUAL	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	CAMPOS BRAVO JORGE IVAN	", correo:"	jorgecampos47@aragon.unam.mx	" },  grupo:"	2859	",lunes:"		<br>		", martes:"	19:00	<br>	21:00	",miercoles:"		<br>		",jueves:"	19:00	<br>	21:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A204	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	TORRES RODRIGUEZ GERARDO	", correo:"	gerardotorreswa@aragon.unam.mx	" },  grupo:"	2859	",lunes:"		<br>		", martes:"	17:00	<br>	19:00	",miercoles:"		<br>		",jueves:"	17:00	<br>	19:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>		SALA 7 CENTRO DE COMPUTO	" },
{ clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	MENDOZA GONZALEZ OMAR	", correo:"	omarmendoza564@aragon.unam.mx	" },  grupo:"	2860	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	ROMERO ANDALON JESUS ANGEL	", correo:"	jesusandalonsa@aragon.unam.mx	" },  grupo:"	2860	",lunes:"		<br>		", martes:"	18:15	<br>	20:15	",miercoles:"		<br>		",jueves:"	18:15	<br>	20:15	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	SANCHEZ HERNANDEZ MIGUEL ANGEL	", correo:"	miguelsanchezt32@aragon.unam.mx	" },  grupo:"	2860	",lunes:"		<br>		", martes:"	15:00	<br>	17:00	",miercoles:"		<br>		",jueves:"	15:00	<br>	17:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1719	", materia:"	REDES DE COMPUTADORAS 1 (L)	", profesor:{ nombre:"	ANAYA MANILA DZOARA IVETTE	", correo:"	#N/D	" },  grupo:"	2860	",lunes:"	20:30	<br>	21:50	", martes:"		<br>		",miercoles:"	20:30	<br>	21:50	",jueves:"		<br>		",viernes:"	20:30	<br>	21:50	", sabado:"		<br>		", salon:"	A11204	" },
{ clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	CANTO GALLO RAFAEL	", correo:"	rafaelgallos4@aragon.unam.mx	" },  grupo:"	2861	",lunes:"	19:00	<br>	20:20	", martes:"		<br>		",miercoles:"	19:00	<br>	20:20	",jueves:"		<br>		",viernes:"	19:00	<br>	20:20	", sabado:"		<br>		", salon:"	CCSAL1	" },
{ clv:"	1917	", materia:"	HABILIDADES DIRECTIVAS	", profesor:{ nombre:"	UGALDE LOPEZ JUDITH	", correo:"	judithugalde86@aragon.unam.mx	" },  grupo:"	2861	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"	17:00	<br>	21:00	", sabado:"		<br>		", salon:"	A11205	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	GUTIERREZ LOPEZ FELIPE DE JESUS	", correo:"	felipegutierrez25@aragon.unam.mx	" },  grupo:"	2861	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"	17:30	<br>	22:00	", sabado:"		<br>		", salon:"	LABCOMP6	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	QUIROZ ALMARAZ SERGIO	", correo:"	sergioquirozhs3@aragon.unam.mx	" },  grupo:"	2861	",lunes:"		<br>		", martes:"	19:00	<br>	21:00	",miercoles:"		<br>		",jueves:"	19:00	<br>	21:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A507	" },
{ clv:"	1810	", materia:"	BASES DE DATOS 2	", profesor:{ nombre:"	SOBERANES JAIME ROBERTO MISAEL	", correo:"	misaelsoberanesr8@aragon.unam.mx	" },  grupo:"	2862	",lunes:"	19:00	<br>	21:00	", martes:"		<br>		",miercoles:"	19:00	<br>	21:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1812	", materia:"	PROGRAMACION MOVIL 1	", profesor:{ nombre:"	MARTINEZ BRAVO VICTOR HUGO	", correo:"	#N/D	" },  grupo:"	2862	",lunes:"		<br>		", martes:"	19:00	<br>	21:30	",miercoles:"		<br>		",jueves:"	19:00	<br>	21:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A506	" },
{ clv:"	1813	", materia:"	REDES DE COMPUTADORAS 2	", profesor:{ nombre:"	GARCIA GUZMAN ENRIQUE	", correo:"	enriquegarcia6u4@aragon.unam.mx	" },  grupo:"	2862	",lunes:"		<br>		", martes:"	16:00	<br>	18:00	",miercoles:"		<br>		",jueves:"	16:00	<br>	18:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	CLOUD	" }
        ] },
    { nombre:"NOVENO SEMESTRE MATUTINO", materias:[
        { clv:"	0406	", materia:"	INTELIGENCIA ARTIFICIAL	", profesor:{ nombre:"	ROMERO UGALDE MARTIN MANUEL	", correo:"	martinromerorou@aragon.unam.mx	" },  grupo:"	2907	",lunes:"	11:20	<br>	12:40	", martes:"		<br>		",miercoles:"	11:20	<br>	12:40	",jueves:"		<br>		",viernes:"	11:20	<br>	12:40	", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	1908	", materia:"	MINERIA DE DATOS	", profesor:{ nombre:"	JUAREZ ROBLES ELIZABETH	", correo:"	elizabethjuarezjur@aragon.unam.mx	" },  grupo:"	2907	",lunes:"	15:00	<br>	17:00	", martes:"		<br>		",miercoles:"	15:00	<br>	17:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1705	", materia:"	SEGURIDAD INFORMATICA	", profesor:{ nombre:"	HERNANDEZ AUDELO LEOBARDO	", correo:"	leobardohernandeztn3@aragon.unam.mx	" },  grupo:"	2907	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br> A8117	" },
{ clv:"	1705	", materia:"	SEGURIDAD INFORMATICA	", profesor:{ nombre:"	VERDUZCO RODRIGUEZ MARIANA	", correo:"	marianaverduzco89@aragon.unam.mx	" },  grupo:"	2910	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A203	" }
    ] },
        { nombre:"NOVENO SEMESTRE VESPERTINO", materias:[
            { clv:"	0406	", materia:"	INTELIGENCIA ARTIFICIAL	", profesor:{ nombre:"	MONTERROSA ESCOBAR AMILCAR AMADO	", correo:"	amilcarmonterrosa59@aragon.unam.mx	" },  grupo:"	2957	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8118	" },
{ clv:"	1908	", materia:"	MINERIA DE DATOS	", profesor:{ nombre:"	GOYTIA HERRERA MARCO INTI	", correo:"	marcogoytia44@aragon.unam.mx	" },  grupo:"	2957	",lunes:"		<br>		", martes:"	19:00	<br>	21:00	",miercoles:"		<br>		",jueves:"	19:00	<br>	21:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11204	" },
{ clv:"	1705	", materia:"	SEGURIDAD INFORMATICA	", profesor:{ nombre:"	PALMA LOPEZ DANIEL FERNANDO	", correo:"	fernandopalmaq6@aragon.unam.mx	" },  grupo:"	2957	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	11:00	<br>	15:00	", salon:"	VIRTUAL	" },
{ clv:"	1705	", materia:"	SEGURIDAD INFORMATICA	", profesor:{ nombre:"	SOBERANES JAIME ROBERTO MISAEL	", correo:"	misaelsoberanesr8@aragon.unam.mx	" },  grupo:"	2958	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8117	" },

        ] },
    { nombre:"OPTATIVAS MATUTINO", materias:[
        { clv:"	0001	", materia:"	ADQUISICION DE DATOS	", profesor:{ nombre:"	MENDOZA GONZALEZ OMAR	", correo:"	omarmendoza564@aragon.unam.mx	" },  grupo:"	2007	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br>SALA 3 biblioteca	"  },
{ clv:"	1627	", materia:"	INSTRUMENTACION Y CONTROL	", profesor:{ nombre:"	ZUÑIGA VILLEGAS BENITO	", correo:"	benitozunigalp4@aragon.unam.mx	" },  grupo:"	2007	",lunes:"		<br>		", martes:"	09:00	<br>	11:15	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:15	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11201	" },
{ clv:"	2128	", materia:"	ROBOTICA	", profesor:{ nombre:"	CASTRO DIAZ JOSE DANIEL	", correo:"	josecastrocad@aragon.unam.mx	" },  grupo:"	2007	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A212	" },
{ clv:"	0167	", materia:"	TEMAS ESPECIALES DE COMPUTACION 1	", profesor:{ nombre:"	AVILA GARCIA JOSE ANTONIO	", correo:"	antonioavilana@aragon.unam.mx	" },  grupo:"	2007	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11204	" },
{ clv:"	0314	", materia:"	VINCULACION EMPRESARIAL	", profesor:{ nombre:"	VELASCO AGUSTIN AARON	", correo:"	aaronvelascovea@aragon.unam.mx	" },  grupo:"	2007	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"	13:00	<br>	17:00	", sabado:"		<br>		", salon:"	A205	" },
{ clv:"	1627	", materia:"	INSTRUMENTACION Y CONTROL	", profesor:{ nombre:"	PATIÑO RODRIGUEZ RAMON	", correo:"	ramonrodriguezn9@aragon.unam.mx	" },  grupo:"	2008	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8120	" },
{ clv:"	0170	", materia:"	PROGRAMACION DE VIDEOJUEGOS 1	", profesor:{ nombre:"	CANDELARIO ALAVEZ JORGE LUIS	", correo:"	jorgecandelariocaa@aragon.unam.mx	" },  grupo:"	2008	",lunes:"	10:00	<br>	11:30	", martes:"		<br>		",miercoles:"	10:00	<br>	11:30	",jueves:"		<br>		",viernes:"	10:00	<br>	11:30	", sabado:"		<br>		", salon:"	A213	" },
{ clv:"	2128	", materia:"	ROBOTICA	", profesor:{ nombre:"	GONZALEZ MAXINEZ DAVID JAIME	", correo:"	davidmaxinezs2@aragon.unam.mx	" },  grupo:"	2008	",lunes:"	11:00	<br>	12:20	", martes:"		<br>		",miercoles:"	11:00	<br>	12:20	",jueves:"		<br>		",viernes:"	11:00	<br>	12:20	", sabado:"		<br>		", salon:"	A8121	" },
{ clv:"	2138	", materia:"	SISTEMAS EXPERTOS	", profesor:{ nombre:"	ROMERO UGALDE MARTIN MANUEL	", correo:"	martinromerorou@aragon.unam.mx	" },  grupo:"	2008	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A11203	" },
{ clv:"	0167	", materia:"	TEMAS ESPECIALES DE COMPUTACION 1	", profesor:{ nombre:"	VEGA MUNGUIA ELIO	", correo:"	eliovegavem@aragon.unam.mx	" },  grupo:"	2008	",lunes:"		<br>		", martes:"	09:00	<br>	11:00	",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	VIRTUAL	" },
{ clv:"	0302	", materia:"	COMPUTO EN LA NUBE	", profesor:{ nombre:"	CRUZ ORTIZ MIRIAM	", correo:"	#N/D	" },  grupo:"	2009	",lunes:"		<br>		", martes:"	14:00	<br>	16:00	",miercoles:"		<br>		",jueves:"	14:00	<br>	16:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br>A203	" },
{ clv:"	0312	", materia:"	TEMAS ESPECIALES DE REDES	", profesor:{ nombre:"	GALICIA RANGEL GILDA	", correo:"	gildarangelb5@aragon.unam.mx	" },  grupo:"	2009	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8120	" },
{ clv:"	0313	", materia:"	TEMAS ESPECIALES DE SEGURIDAD INFORM	", profesor:{ nombre:"	NERIA OROZCO ERIK DE JESUS	", correo:"	eriknerianeo@aragon.unam.mx	" },  grupo:"	2009	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A203	" },
{ clv:"	1003	", materia:"	PROYECTO ESCUELA-INDUSTRIA	", profesor:{ nombre:"	FLORES DIAZ IMELDA DE LA LUZ	", correo:"	imeldaflores29@aragon.unam.mx	" },  grupo:"	2010	",lunes:"	08:30	<br>	09:50	", martes:"		<br>		",miercoles:"	08:30	<br>	09:50	",jueves:"		<br>		",viernes:"	08:30	<br>	09:50	", sabado:"		<br>		", salon:"	A205	" },
{ clv:"	0018	", materia:"	SEMINARIO INGENIERIA EN COMPUTACION	", profesor:{ nombre:"	FLORES DIAZ IMELDA DE LA LUZ	", correo:"	imeldaflores29@aragon.unam.mx	" },  grupo:"	2010	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:" <strong>CAMBIO DE SALÓN</STRONG><br>	A205	" },
{ clv:"	0167	", materia:"	TEMAS ESPECIALES DE COMPUTACION 1	", profesor:{ nombre:"	FLORES DIAZ IMELDA DE LA LUZ	", correo:"	imeldaflores29@aragon.unam.mx	" },  grupo:"	2010	",lunes:"		<br>		", martes:"	07:00	<br>	09:00	",miercoles:"		<br>		",jueves:"	07:00	<br>	09:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br>A205	" },
{ clv:"	0170	", materia:"	PROGRAMACION DE VIDEOJUEGOS 1	", profesor:{ nombre:"	SALGADO RODRIGUEZ JOSE FRANCISCO	", correo:"	franciscosalgadoi2@aragon.unam.mx	" },  grupo:"	2011	",lunes:"	07:00	<br>	08:20	", martes:"		<br>		",miercoles:"	07:00	<br>	08:20	",jueves:"		<br>		",viernes:"	07:00	<br>	08:20	", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	1003	", materia:"	PROYECTO ESCUELA-INDUSTRIA	", profesor:{ nombre:"	HERNANDEZ AGUILAR CESAR ALBERTO	", correo:"	#N/D	" },  grupo:"	2011	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	07:00	<br>	11:00	", salon:"	VIRTUAL	" },
{ clv:"	0171	", materia:"	TEMAS ESPECIALES DE COMPUTACION 2	", profesor:{ nombre:"	VALENZUELA RAMOS JUAN GERMAN	", correo:"	germanvalenzuelag3@aragon.unam.mx	" },  grupo:"	2011	",lunes:"	11:40	<br>	13:00	", martes:"		<br>		",miercoles:"	11:40	<br>	13:00	",jueves:"		<br>		",viernes:"	11:40	<br>	13:00	", sabado:"		<br>		", salon:"	A505	" },
{ clv:"	1910	", materia:"	GRAFICACION POR COMPUTADORA	", profesor:{ nombre:"	SALGADO RODRIGUEZ JOSE FRANCISCO	", correo:"	franciscosalgadoi2@aragon.unam.mx	" },  grupo:"	2012	",lunes:"	10:00	<br>	11:20	", martes:"		<br>		",miercoles:"	10:00	<br>	11:20	",jueves:"		<br>		",viernes:"	10:00	<br>	11:20	", sabado:"		<br>		", salon:"	A11204	" },
{ clv:"	0167	", materia:"	TEMAS ESPECIALES DE COMPUTACION 1	", profesor:{ nombre:"	HERNANDEZ CABRERA JESUS	", correo:"	jesushernandezls7@aragon.unam.mx	" },  grupo:"	2012	",lunes:"		<br>		", martes:"	11:00	<br>	13:00	",miercoles:"		<br>		",jueves:"	11:00	<br>	13:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A204	" },
{ clv:"	0175	", materia:"	TEMAS ESPECIALES DE COMPUTACION 3 ", profesor:{ nombre:"	ALMANZAR VAZQUEZ MARIA GUADALUPE	", correo:"	guadalupealmanzar1a@aragon.unam.mx	" },  grupo:"	2012	",lunes:"	07:00	<br>	09:00	", martes:"		<br>		",miercoles:"	07:00	<br>	09:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11202	" },
{ clv:"	1910	", materia:"	GRAFICACION POR COMPUTADORA	", profesor:{ nombre:"	CANDELARIO ALAVEZ JORGE LUIS	", correo:"	jorgecandelariocaa@aragon.unam.mx	" },  grupo:"	2013	",lunes:"	11:40	<br>	13:00	", martes:"		<br>		",miercoles:"	11:40	<br>	13:00	",jueves:"		<br>		",viernes:"	11:40	<br>	13:00	", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	0174	", materia:"	PROGRAMACION DE VIDEOJUEGOS 2	", profesor:{ nombre:"	SALGADO RODRIGUEZ JOSE FRANCISCO	", correo:"	franciscosalgadoi2@aragon.unam.mx	" },  grupo:"	2013	",lunes:"	11:30	<br>	12:50	", martes:"		<br>		",miercoles:"	11:30	<br>	12:50	",jueves:"		<br>		",viernes:"	11:30	<br>	12:50	", sabado:"		<br>		", salon:"	A11203	" },
{ clv:"	0174	", materia:"	PROGRAMACION DE VIDEOJUEGOS 2	", profesor:{ nombre:"	SALGADO RODRIGUEZ JOSE FRANCISCO	", correo:"	franciscosalgadoi2@aragon.unam.mx	" },  grupo:"	2011	",lunes:"	08:30	<br>	09:50	", martes:"		<br>		",miercoles:"	08:30	<br>	09:50	",jueves:"		<br>		",viernes:"	08:30	<br>	09:50	", sabado:"		<br>		", salon:"	A11203	" },
{ clv:"	0301	", materia:"	APRENDIZAJE AUTOMATICO	", profesor:{ nombre:"	MARCOS FRANCISCO ESPARZA POSADAS	", correo:"	@aragon.unam.mx	" },  grupo:"	2015	",lunes:"		<br>		", martes:"	09:00	<br> 11:00		",miercoles:"		<br>		",jueves:"	09:00	<br>	11:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>GRUPO NUEVO</STRONG><br>		A8120" }
    ] },
    { nombre:"OPTATIVAS VESPERTINO", materias:[
        { clv:"	0008	", materia:"	ADMINISTRACION SISTEMAS MULTIUSUAR	", profesor:{ nombre:"	LOPEZ HERNANDEZ JORGE ARTURO	", correo:"	jorgelopez91@aragon.unam.mx	" },  grupo:"	2057	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"	17:00	<br>	21:00	", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	1916	", materia:"	PROCESAMIENTO DIGIT.IMAGENES	", profesor:{ nombre:"	GONZALEZ PONCE ALEJANDRO RENE	", correo:"	alejandrogonzalez1e8@aragon.unam.mx	" },  grupo:"	2057	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11205	" },
{ clv:"	1003	", materia:"	PROYECTO ESCUELA-INDUSTRIA	", profesor:{ nombre:"	COVARRUBIAS RODRIGUEZ FERNANDO ROBERTO	", correo:"	fernandocovarrubiast2@aragon.unam.mx	" },  grupo:"	2057	",lunes:"	19:30	<br>	21:30	", martes:"		<br>		",miercoles:"	19:30	<br>	21:30	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8120	" },
{ clv:"	0018	", materia:"	SEMINARIO INGENIERIA EN COMPUTACION	", profesor:{ nombre:"	CANO SANTOS BERENICE	", correo:"	berenicecanoz0@aragon.unam.mx	" },  grupo:"	2057	",lunes:"	18:40	<br>	20:00	", martes:"		<br>		",miercoles:"	18:40	<br>	20:00	",jueves:"		<br>		",viernes:"	18:40	<br>	20:00	", sabado:"		<br>		", salon:"	<strong>CAMBIO DE SALÓN</STRONG><br>A8118	" },
{ clv:"	0167	", materia:"	TEMAS ESPECIALES DE COMPUTACION 1	", profesor:{ nombre:"	VALENZUELA LOPEZ RODOLFO	", correo:"	rodolfovalenzuela70@aragon.unam.mx	" },  grupo:"	2057	",lunes:"	19:00	<br>	20:20	", martes:"		<br>		",miercoles:"	19:00	<br>	20:20	",jueves:"		<br>		",viernes:"	19:00	<br>	20:20	", sabado:"		<br>		", salon:"	A8121	" },
{ clv:"	1910	", materia:"	GRAFICACION POR COMPUTADORA	", profesor:{ nombre:"	HERNANDEZ CERVANTES LILIANA	", correo:"	lilianahernandezc4@aragon.unam.mx	" },  grupo:"	2058	",lunes:"		<br>		", martes:"	18:00	<br>	20:00	",miercoles:"		<br>		",jueves:"	18:00	<br>	20:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11203	" },
{ clv:"	1627	", materia:"	INSTRUMENTACION Y CONTROL	", profesor:{ nombre:"	GARCIA GUZMAN ENRIQUE	", correo:"	enriquegarcia6u4@aragon.unam.mx	" },  grupo:"	2058	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>CAMBIO DE SALÓN</STRONG><br>	A205	" },
{ clv:"	2138	", materia:"	SISTEMAS EXPERTOS	", profesor:{ nombre:"	ROMERO UGALDE MARTIN MANUEL	", correo:"	martinromerorou@aragon.unam.mx	" },  grupo:"	2058	",lunes:"	14:00	<br>	16:00	", martes:"		<br>		",miercoles:"	14:00	<br>	16:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8119	" },
{ clv:"	0167	", materia:"	TEMAS ESPECIALES DE COMPUTACION 1	", profesor:{ nombre:"	ESCONDRILLAS MAYA CARLOS	", correo:"	carlosescondrillasn68@aragon.unam.mx	" },  grupo:"	2058	",lunes:"		<br>		", martes:"	19:30	<br>	21:30	",miercoles:"		<br>		",jueves:"	19:30	<br>	21:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11201	" },
{ clv:"	0013	", materia:"	TEMAS ESPECIALES DE BASES	", profesor:{ nombre:"	GRADA HUERTA IVAN	", correo:"	ivangrada1f1@aragon.unam.mx	" },  grupo:"	2865	",lunes:"		<br>		", martes:"	19:00	<br>	21:00	",miercoles:"		<br>		",jueves:"	19:00	<br>	21:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"<strong>GRUPO NUEVO</STRONG><br>		A8121	" },
{ clv:"	0174	", materia:"	PROGRAMACION DE VIDEOJUEGOS 2	", profesor:{ nombre:"	CANDELARIO ALAVEZ JORGE LUIS	", correo:"	jorgecandelariocaa@aragon.unam.mx	" },  grupo:"	2060	",lunes:"	15:00	<br>	16:20	", martes:"		<br>		",miercoles:"	15:00	<br>	16:20	",jueves:"		<br>		",viernes:"	15:00	<br>	16:20	", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	0171	", materia:"	TEMAS ESPECIALES DE COMPUTACION 2	", profesor:{ nombre:"	MORALES PALAFOX EDGAR	", correo:"	edgarpalafox19@aragon.unam.mx	" },  grupo:"	2060	",lunes:"	20:00	<br>	22:00	", martes:"		<br>		",miercoles:"	20:00	<br>	22:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11203	" },
{ clv:"	0313	", materia:"	TEMAS ESPECIALES DE SEGURIDAD INFORM	", profesor:{ nombre:"	AGUILAR HERNANDEZ JOSE FRANCISCO	", correo:"	franciscoaguilar36@aragon.unam.mx	" },  grupo:"	2060	",lunes:"	19:00	<br>	21:00	", martes:"		<br>		",miercoles:"	19:00	<br>	21:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8117	" },
{ clv:"	0008	", materia:"	ADMINISTRACION SISTEMAS MULTIUSUAR	", profesor:{ nombre:"	NAVARRO DIAZ RAMON	", correo:"	ramonnavarro30@aragon.unam.mx	" },  grupo:"	2061	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	09:00	<br>	13:00	", salon:"	VIRTUAL	" },
{ clv:"	1003	", materia:"	PROYECTO ESCUELA-INDUSTRIA	", profesor:{ nombre:"	CRUZ ROSALES ERNESTO	", correo:"	ernestocruzr3@aragon.unam.mx	" },  grupo:"	2061	",lunes:"	18:00	<br>	22:00	", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11202	" },
{ clv:"	0171	", materia:"	TEMAS ESPECIALES DE COMPUTACION 2	", profesor:{ nombre:"	HERNANDEZ AUDELO LEOBARDO	", correo:"	leobardohernandeztn3@aragon.unam.mx	" },  grupo:"	2061	",lunes:"		<br>		", martes:"	13:00	<br>	15:00	",miercoles:"		<br>		",jueves:"	13:00	<br>	15:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A8120	" },
{ clv:"	0313	", materia:"	TEMAS ESPECIALES DE SEGURIDAD INFORM	", profesor:{ nombre:"	PALMA LOPEZ DANIEL FERNANDO	", correo:"	fernandopalmaq6@aragon.unam.mx	" },  grupo:"	2061	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	07:00	<br>	11:00	", salon:"	VIRTUAL	" },
{ clv:"	0314	", materia:"	VINCULACION EMPRESARIAL	", profesor:{ nombre:"	RIVERO PICAZO MARIELA VIANEY	", correo:"	marielariverorip@aragon.unam.mx	" },  grupo:"	2061	",lunes:"		<br>		", martes:"	17:00	<br>	19:00	",miercoles:"		<br>		",jueves:"	17:00	<br>	19:00	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11201	" },
{ clv:"	0303	", materia:"	INTERNET DE LAS COSAS	", profesor:{ nombre:"	LOZANO MENDEZ EFREN	", correo:"	efrenlozanogg2@aragon.unam.mx	" },  grupo:"	2062	",lunes:"	19:00	<br>	21:00	", martes:"		<br>		",miercoles:"	19:00	<br>	21:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	A216	" },
{ clv:"	1003	", materia:"	PROYECTO ESCUELA-INDUSTRIA	", profesor:{ nombre:"	COLUNGA VAZQUEZ MATILDE	", correo:"	matildecolungacov@aragon.unam.mx	" },  grupo:"	2062	",lunes:"		<br>		", martes:"		<br>		",miercoles:"	14:00	<br>	16:00	",jueves:"		<br>		",viernes:"	14:00	<br>	16:00	", sabado:"		<br>		", salon:"	A211	" },
{ clv:"	0312	", materia:"	TEMAS ESPECIALES DE REDES	", profesor:{ nombre:"	TORRES RODRIGUEZ GERARDO	", correo:"	gerardotorreswa@aragon.unam.mx	" },  grupo:"	2062	",lunes:"	17:00	<br>	18:20	", martes:"		<br>		",miercoles:"	17:00	<br>	18:20	",jueves:"		<br>		",viernes:"	17:00	<br>	18:20	", sabado:"		<br>		", salon:"	A8118	" }
    ] },
    { nombre:"LABORATORIO DE REDES ", materias:[
        { clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	DAVILA PEREZ RENE ADRIAN	", correo:"	renedavilar5@aragon.unam.mx	" },  grupo:"	8701	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	07:00	<br>	08:30	", salon:"	VIRTUAL	" },
{ clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	DAVILA PEREZ RENE ADRIAN	", correo:"	renedavilar5@aragon.unam.mx	" },  grupo:"	8702	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	08:30	<br>	10:00	", salon:"	VIRTUAL	" },
{ clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	DAVILA PEREZ RENE ADRIAN	", correo:"	renedavilar5@aragon.unam.mx	" },  grupo:"	8703	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	10:00	<br>	11:30	", salon:"	VIRTUAL	" },
{ clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	DAVILA PEREZ RENE ADRIAN	", correo:"	renedavilar5@aragon.unam.mx	" },  grupo:"	8704	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"	11:30	<br>	13:00	", salon:"	VIRTUAL	" },
{ clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	QUINTERO CERVANTES JOSE MANUEL	", correo:"	josequinteroquc@aragon.unam.mx	" },  grupo:"	8705	",lunes:"		<br>		", martes:"	09:00	<br>	10:30	",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	QUINTERO CERVANTES JOSE MANUEL	", correo:"	josequinteroquc@aragon.unam.mx	" },  grupo:"	8706	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"	09:00	<br>	10:30	",viernes:"		<br>		", sabado:"		<br>		", salon:"	A11204	" },
{ clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	TORRES RODRIGUEZ GERARDO	", correo:"	gerardotorreswa@aragon.unam.mx	" },  grupo:"	8707	",lunes:"	18:30	<br>	20:00	", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	TORRES RODRIGUEZ GERARDO	", correo:"	gerardotorreswa@aragon.unam.mx	" },  grupo:"	8708	",lunes:"		<br>		", martes:"		<br>		",miercoles:"	18:30	<br>	20:00	",jueves:"		<br>		",viernes:"		<br>		", sabado:"		<br>		", salon:"	CLOUD	" },
{ clv:"	8702	", materia:"	LAB REDES DE COMPUTADORAS I	", profesor:{ nombre:"	TORRES RODRIGUEZ GERARDO	", correo:"	gerardotorreswa@aragon.unam.mx	" },  grupo:"	8709	",lunes:"		<br>		", martes:"		<br>		",miercoles:"		<br>		",jueves:"		<br>		",viernes:"	18:30	<br>	20:00	", sabado:"		<br>		", salon:"	CLOUD	" }
    ] }
  ]
};

const select = document.getElementById("semestreSelect");
const tbody = document.getElementById("tablaBody");

/* Cargar selector */
data.semestres.forEach((s,i)=>{
    const opt = document.createElement("option");
    opt.value=i;
    opt.textContent=s.nombre;
    select.appendChild(opt);
});

/* Cargar uno o todos */
function cargarSemestre(index){
    tbody.innerHTML="";

    const lista = index === "all"
        ? data.semestres.map((_,i)=>i)
        : [index];

    lista.forEach(i=>{
        tbody.innerHTML += \`
          <tr class="semestre-row">
            <td colspan="11">\${data.semestres[i].nombre}</td>
          </tr>
        \`;

        const mats = data.semestres[i].materias;

        if(mats.length===0){
            tbody.innerHTML += \`
              <tr><td colspan="11">SIN MATERIAS REGISTRADAS</td></tr>\`;
            return;
        }

        mats.forEach(m=>{
            tbody.innerHTML += \`
            <tr>
                <td>\${m.clv}</td>
                <td class="left">\${m.materia}</td>
                <td class="left profesor">
                    <span class="nombre-profesor">\${m.profesor.nombre}</span>
                    <a class="correo-profesor" href="mailto:\${m.profesor.correo}">
                        \${m.profesor.correo}
                    </a>
                </td>
                <td>\${m.grupo}</td>
                <td>\${m.lunes}</td>
                <td>\${m.martes}</td>
                <td>\${m.miercoles}</td>
                <td>\${m.jueves}</td>
                <td>\${m.viernes}</td>
                <td>\${m.sabado}</td>
                <td>\${m.salon}</td>
            </tr>\`;
        });
    });
}

/* Eventos */
select.addEventListener("change",e=>cargarSemestre(e.target.value));

document.addEventListener("click",e=>{
    const prof = e.target.closest(".profesor");
    if(!prof) return;

    document.querySelectorAll(".profesor.activo")
      .forEach(p=>{ if(p!==prof) p.classList.remove("activo"); });

    prof.classList.toggle("activo");
});

/* Inicial: TODOS */
cargarSemestre("all");
</script>

</body>
</html>

`;

export function Horarios() {
  const { t } = useTranslation()

  return (
    <section className="horarios-embed" aria-labelledby="horarios-embed-title">
      <div className="horarios-embed__cabeceras">
        <CabeceraTitulo variante="dorado">
          {t('schedulesView.tituloSemestre')}
        </CabeceraTitulo>
      </div>
      <ContenidoHtml
        html={html}
        title={t('schedulesView.iframeTitle')}
        sandbox="allow-same-origin allow-scripts"
        className="horarios-embed__contenido"
        iframeStyle={{ minHeight: 'min(70vh, 720px)' }}
      />
    </section>
  )
}

export default Horarios
