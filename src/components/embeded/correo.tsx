import ContenidoHtml from './ContenidoHtml'

// HTML embebido: directorio de correos del profesorado con buscador y tabla.
const html = `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Directorio UNAM</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
        }



        input {
            width: 60%;
            max-width: 400px;
            padding: 10px;
            margin-bottom: 20px;
            font-size: 16px;
            border: 2px solid #C69214;
            border-radius: 6px;
            text-align: center;
            outline: none;
        }

        input:focus {
            border-color: #003B5C;
        }

        table {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            border-collapse: collapse;
            background-color: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        thead {
            background-color: #003B5C;
            color: #FFFFFF;
        }

        th, td {
            padding: 12px;
            border: 1px solid #C69214;
            text-align: center;
        }

        tbody tr:nth-child(even) {
            background-color: #F2F2F2;
        }

        tbody tr:hover {
            background-color: #E6EEF2;
        }

        a {
            color: #003B5C;
            font-weight: bold;
            text-decoration: none;
        }

        a:hover {
            color: #C69214;
            text-decoration: underline;
        }
    </style>
</head>
<body>

<!-- 🔍 Buscador -->
<input
    type="text"
    id="buscador"
    placeholder="Buscar por nombre o apellido..."
    onkeyup="filtrarTabla()"
>

<table id="tablaCorreos">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Correo Institucional</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<script>
    const datos = [
{"nombre":"	ABURTO CAMACHO BLANCA PAMELA	","correo":"	blancaaburto6c4@aragon.unam.mx	       " },
{"nombre":"	AGUILAR HERNANDEZ JOSE FRANCISCO	","correo":"	franciscoaguilar36@aragon.unam.mx	       " },
{"nombre":"	ALBA VILLA BELEN ANAID	","correo":"	belenalba749@aragon.unam.mx	       " },
{"nombre":"	ALMANZAR VAZQUEZ MARIA GUADALUPE	","correo":"	guadalupealmanzar1a@aragon.unam.mx	       " },
{"nombre":"	ARELLANO RIVERA ESTEBAN	","correo":"	estebanriverac1@aragon.unam.mx	       " },
{"nombre":"	ARMENTA SOSA HORACIO	","correo":"	horacioarmentaj3@aragon.unam.mx	       " },
{"nombre":"	AVILA GARCIA JOSE ANTONIO	","correo":"	antonioavilana@aragon.unam.mx	       " },
{"nombre":"	AYALA PEÑA ESTEBAN	","correo":"	estebanayalapxa@aragon.unam.mx	       " },
{"nombre":"	BERNAL DIAZ ARCELIA	","correo":"	arceliabernal83@aragon.unam.mx	       " },
{"nombre":"	BLANCO BAUTISTA ROBERTO	","correo":"	robertoblancoir4@aragon.unam.mx	       " },
{"nombre":"	CAMACHO ALVAREZ JUAN CARLOS	","correo":"	juancamachocaa@aragon.unam.mx	       " },
{"nombre":"	CAMPOS BRAVO JORGE IVAN	","correo":"	jorgecampos47@aragon.unam.mx	       " },
{"nombre":"	CANDELARIO ALAVEZ JORGE LUIS	","correo":"	jorgecandelariocaa@aragon.unam.mx	       " },
{"nombre":"	CANO SANTOS BERENICE	","correo":"	berenicecanoz0@aragon.unam.mx	       " },
{"nombre":"	CANTO GALLO RAFAEL	","correo":"	rafaelgallos4@aragon.unam.mx	       " },
{"nombre":"	CASTRO DIAZ JOSE DANIEL	","correo":"	josecastrocad@aragon.unam.mx	       " },
{"nombre":"	CERVANTES PATIÑO MOISES	","correo":"	moisescervantes5d4@aragon.unam.mx	       " },
{"nombre":"	CHAPA PLATA MARTHA	","correo":"	marthachapa70@aragon.unam.mx	       " },
{"nombre":"	CHIAPA MONROY CUAUHTEMOC	","correo":"	cuauhtemocchiapacim@aragon.unam.mx	       " },
{"nombre":"	COLUNGA VAZQUEZ MATILDE	","correo":"	matildecolungacov@aragon.unam.mx	       " },
{"nombre":"	COVARRUBIAS RODRIGUEZ FERNANDO ROBERTO	","correo":"	fernandocovarrubiast2@aragon.unam.mx	       " },
{"nombre":"	CRUZ LUEVANO BLANCA ESTELA	","correo":"	blancaluevanoq9@aragon.unam.mx	       " },
{"nombre":"	CRUZ ROSALES ERNESTO	","correo":"	ernestocruzr3@aragon.unam.mx	       " },
{"nombre":"	DAVILA PEREZ RENE ADRIAN	","correo":"	renedavilar5@aragon.unam.mx	       " },
{"nombre":"	DELGADO VIEYRA SANDRA NAYELI	","correo":"	nayelivieyrafa@aragon.unam.mx	       " },
{"nombre":"	ESCONDRILLAS MAYA CARLOS	","correo":"	carlosescondrillasn68@aragon.unam.mx	       " },
{"nombre":"	FALCON ARELLANO BERENICE ITZEL	","correo":"	berenicefalconlk6@aragon.unam.mx	       " },
{"nombre":"	FERIA VICTORIA MARIA ANGELICA	","correo":"	angelicaferiaf6@aragon.unam.mx	       " },
{"nombre":"	FLORES DIAZ IMELDA DE LA LUZ	","correo":"	imeldaflores29@aragon.unam.mx	       " },
{"nombre":"	GALICIA RANGEL GILDA	","correo":"	gildarangelb5@aragon.unam.mx	       " },
{"nombre":"	GARCIA GUZMAN ENRIQUE	","correo":"	enriquegarcia6u4@aragon.unam.mx	       " },
{"nombre":"	GARCIA MONROY JOSE ANTONIO	","correo":"	josegarciay1@aragon.unam.mx	       " },
{"nombre":"	GARCIA VILLANUEVA MA. DEL PILAR	","correo":"	magarciap9@aragon.unam.mx	       " },
{"nombre":"	GARIBAY PEDRAZA ALMA LILIA	","correo":"	almagaribayr7@aragon.unam.mx	       " },
{"nombre":"	GASTALDI PEREZ JUAN	","correo":"	juangastaldi9a@aragon.unam.mx	       " },
{"nombre":"	GERMAN ROSAS CESAR FRANCISCO	","correo":"	cesargermanx9@aragon.unam.mx	       " },
{"nombre":"	GONZALEZ AYALA LUIS ENRIQUE	","correo":"	enriqueayala51@aragon.unam.mx	       " },
{"nombre":"	GONZALEZ BETANCOURT RAFAEL	","correo":"	rafaelgonzalezma2@aragon.unam.mx	       " },
{"nombre":"	GONZALEZ HERNANDEZ GERARDO	","correo":"	gerardogonzalezgoh@aragon.unam.mx	       " },
{"nombre":"	GONZALEZ HERNANDEZ MARIA GABRIELA	","correo":"	gabrielagonzalezc7@aragon.unam.mx	       " },
{"nombre":"	GONZALEZ MAXINEZ DAVID JAIME	","correo":"	davidmaxinezs2@aragon.unam.mx	       " },
{"nombre":"	GONZALEZ PONCE ALEJANDRO RENE	","correo":"	alejandrogonzalez1e8@aragon.unam.mx	       " },
{"nombre":"	GOYTIA HERRERA MARCO INTI	","correo":"	marcogoytia44@aragon.unam.mx	       " },
{"nombre":"	GRADA HUERTA IVAN	","correo":"	ivangrada1f1@aragon.unam.mx	       " },
{"nombre":"	GUERRERO SANTAMARIA EFREN	","correo":"	efrenguerreroc91@aragon.unam.mx	       " },
{"nombre":"	GUTIERREZ CASTILLO ALMA ROSA	","correo":"	almagutierrez88@aragon.unam.mx	       " },
{"nombre":"	GUTIERREZ LOPEZ FELIPE DE JESUS	","correo":"	felipegutierrez25@aragon.unam.mx	       " },
{"nombre":"	GUTIERREZ OROZCO RICARDO	","correo":"	ricardogutierrezs0@aragon.unam.mx	       " },
{"nombre":"	HERNANDEZ AUDELO LEOBARDO	","correo":"	leobardohernandeztn3@aragon.unam.mx	       " },
{"nombre":"	HERNANDEZ CERVANTES LILIANA	","correo":"	lilianahernandezc4@aragon.unam.mx	       " },
{"nombre":"	HERNANDEZ CONTRERAS JUAN MANUEL	","correo":"	juanhernandez1z7@aragon.unam.mx	       " },
{"nombre":"	HERNANDEZ GALICIA SALOMON	","correo":"	salomongaliciar5@aragon.unam.mx	       " },
{"nombre":"	HERNANDEZ HERNANDEZ MARTIN	","correo":"	martinhernandez5u8@aragon.unam.mx	       " },
{"nombre":"	HERNANDEZ LOPEZ SERGIO	","correo":"	sergiohernandezhel@aragon.unam.mx	       " },
{"nombre":"	ISLAS HERNANDEZ CLARA YAHAIRA	","correo":"	yahairaislasv6@aragon.unam.mx	       " },
{"nombre":"	JUAREZ PALMA JOSE GIL	","correo":"	giljuarezb9@aragon.unam.mx	       " },
{"nombre":"	JUAREZ ROBLES ELIZABETH	","correo":"	elizabethjuarezjur@aragon.unam.mx	       " },
{"nombre":"	LOPEZ CARRETO JUAN MANUEL	","correo":"	manuelcarreto50@aragon.unam.mx	       " },
{"nombre":"	LOPEZ HERNANDEZ JORGE ARTURO	","correo":"	jorgelopez91@aragon.unam.mx	       " },
{"nombre":"	LOZANO MENDEZ EFREN	","correo":"	efrenlozanogg2@aragon.unam.mx	       " },
{"nombre":"	MARTINEZ ROMERO JONATHAN	","correo":"	jonathanmartinezky7@aragon.unam.mx	       " },
{"nombre":"	MENDOZA GONZALEZ OMAR	","correo":"	omarmendoza564@aragon.unam.mx	       " },
{"nombre":"	MONDRAGON ESCOBAR ALFREDO	","correo":"	alfredomondragontg8@aragon.unam.mx	       " },
{"nombre":"	MONTERROSA ESCOBAR AMILCAR AMADO	","correo":"	amilcarmonterrosa59@aragon.unam.mx	       " },
{"nombre":"	MORALES GONZALEZ JORGE CARLOS	","correo":"	jorgegonzalez71@aragon.unam.mx	       " },
{"nombre":"	MORALES PALAFOX EDGAR	","correo":"	edgarpalafox19@aragon.unam.mx	       " },
{"nombre":"	NAVARRO DIAZ RAMON	","correo":"	ramonnavarro30@aragon.unam.mx	       " },
{"nombre":"	NERIA OROZCO ERIK DE JESUS	","correo":"	eriknerianeo@aragon.unam.mx	       " },
{"nombre":"	OCAMPO ALVAREZ ARTURO	","correo":"	arturoocampo76@aragon.unam.mx	       " },
{"nombre":"	OLIVER MORALES CARLOS	","correo":"	carlosolivers3@aragon.unam.mx	       " },
{"nombre":"	ORDOÑEZ ROSALES MARTIN	","correo":"	martinordonez7e1@aragon.unam.mx	       " },
{"nombre":"	ORTEGA NAVA CARLOS FERNANDO	","correo":"	fernandonava16@aragon.unam.mx	       " },
{"nombre":"	ORTIZ CORDERO GABRIEL	","correo":"	gabrielortizoic@aragon.unam.mx	       " },
{"nombre":"	ORTIZ JIMENEZ MARIA ELENA	","correo":"	mariaortizq7@aragon.unam.mx	       " },
{"nombre":"	PALMA LOPEZ DANIEL FERNANDO	","correo":"	fernandopalmaq6@aragon.unam.mx	       " },
{"nombre":"	PARRALES CASTAÑEDA CARLOS ALBERTO	","correo":"	carlosparralesgi2@aragon.unam.mx	       " },
{"nombre":"	PATIÑO RODRIGUEZ RAMON	","correo":"	ramonrodriguezn9@aragon.unam.mx	       " },
{"nombre":"	PELCASTRE RAMIREZ GLORIA SAMANTHA	","correo":"	samanthapelcastrei3@aragon.unam.mx	       " },
{"nombre":"	PEÑALOZA ROMERO ERNESTO	","correo":"	ernestopenalozaffa@aragon.unam.mx	       " },
{"nombre":"	PEREZ GUZMAN ALEJANDRO	","correo":"	alejandropereze9@aragon.unam.mx	       " },
{"nombre":"	PEREZ MEDEL MARCELO	","correo":"	marcelomedelq7@aragon.unam.mx	       " },
{"nombre":"	PEREZ MUÑOZ ANTONIO GERARDO	","correo":"	gerardoperez23@aragon.unam.mx	       " },
{"nombre":"	PEREZ PAZ EDUARDO	","correo":"	eduardoperez53@aragon.unam.mx	       " },
{"nombre":"	PEREZ SANCHEZ HIRAM EMMANUEL	","correo":"	hiramperezl0@aragon.unam.mx	       " },
{"nombre":"	PEREZ VALDES JOEL ALFREDO	","correo":"	joelperezpev@aragon.unam.mx	       " },
{"nombre":"	PICCINELLI BOCCHI GABRIELLA	","correo":"	gabriellapiccinelli30@aragon.unam.mx	       " },
{"nombre":"	QUINTERO CERVANTES JOSE MANUEL	","correo":"	josequinteroquc@aragon.unam.mx	       " },
{"nombre":"	QUIROZ ALMARAZ SERGIO	","correo":"	sergioquirozhs3@aragon.unam.mx	       " },
{"nombre":"	RAMIREZ CRUZ JOSE LUIS	","correo":"	luisramirezm0@aragon.unam.mx	       " },
{"nombre":"	RAMOS MARQUEZ JUAN CARLOS	","correo":"	juanramosram@aragon.unam.mx	       " },
{"nombre":"	REYES CRUZ ANA CLAUDIA	","correo":"	claudiacruze8@aragon.unam.mx	       " },
{"nombre":"	REYES TECONTERO NORMA	","correo":"	normareyesi8@aragon.unam.mx	       " },
{"nombre":"	RODRIGUEZ GARCIA ARTURO	","correo":"	arturorodriguez35@aragon.unam.mx	       " },
{"nombre":"	RODRIGUEZ LUNA JORGE ANTONIO	","correo":"	jorgerodriguezrol@aragon.unam.mx	       " },
{"nombre":"	ROMERO ANDALON JESUS ANGEL	","correo":"	jesusandalonsa@aragon.unam.mx	       " },
{"nombre":"	ROMERO UGALDE MARTIN	","correo":"	martinromerorou@aragon.unam.mx	       " },
{"nombre":"	SALDAÑA ALDANA HECTOR	","correo":"	hectorsaldanaa5@aragon.unam.mx	       " },
{"nombre":"	SALGADO RODRIGUEZ JOSE FRANCISCO	","correo":"	franciscosalgadoi2@aragon.unam.mx	       " },
{"nombre":"	SANCHEZ HERNANDEZ MIGUEL ANGEL	","correo":"	miguelsanchezt32@aragon.unam.mx	       " },
{"nombre":"	SANCHEZ MORALES VICTOR MANUEL	","correo":"	victorsanchezkd6@aragon.unam.mx	       " },
{"nombre":"	SANCHEZ SANCHEZ VICTOR MANUEL	","correo":"	victorsanchez27@aragon.unam.mx	       " },
{"nombre":"	SEGURA RAUDA MINERVA	","correo":"	minervaseguraser@aragon.unam.mx	       " },
{"nombre":"	SOBERANES JAIME ROBERTO MISAEL	","correo":"	misaelsoberanesr8@aragon.unam.mx	       " },
{"nombre":"	SOLIS ALCANTAR EVERARDO	","correo":"	everardosolisr0@aragon.unam.mx	       " },
{"nombre":"	SUAREZ HERRERA ALEJANDRO	","correo":"	alejandrosuarezsuh@aragon.unam.mx	       " },
{"nombre":"	TORRES RODRIGUEZ GERARDO	","correo":"	gerardotorreswa@aragon.unam.mx	       " },
{"nombre":"	TORRES TORRES FAUSTO	","correo":"	faustotorres1k8@aragon.unam.mx	       " },
{"nombre":"	UGALDE LOPEZ JUDITH	","correo":"	judithugalde86@aragon.unam.mx	       " },
{"nombre":"	VALENZUELA LOPEZ RODOLFO	","correo":"	rodolfovalenzuela70@aragon.unam.mx	       " },
{"nombre":"	VALENZUELA RAMOS JUAN GERMAN	","correo":"	germanvalenzuelag3@aragon.unam.mx	       " },
{"nombre":"	VAZQUEZ MORALES RODOLFO	","correo":"	rodolfovazquezh6@aragon.unam.mx	       " },
{"nombre":"	VEGA MUNGUIA ELIO	","correo":"	eliovegavem@aragon.unam.mx	       " },
{"nombre":"	VELASCO AGUSTIN AARON	","correo":"	aaronvelascovea@aragon.unam.mx	       " },
{"nombre":"	VERDE CRUZ ABEL	","correo":"	abelverde53@aragon.unam.mx	       " },
{"nombre":"	VERDUZCO RODRIGUEZ MARIANA	","correo":"	marianaverduzco89@aragon.unam.mx	       " },
{"nombre":"	VIDAL CASTRO RICARDO ADOLFO	","correo":"	ricardovidal79@aragon.unam.mx	       " },
{"nombre":"	VIEYRA REBOYO LUIS ARMANDO	","correo":"	luisvieyra26@aragon.unam.mx	       " },
{"nombre":"	VILLANUEVA ORTEGA JUAN ANTONIO	","correo":"	juanvillanuevavio@aragon.unam.mx	       " },
{"nombre":"	ZUÑIGA VILLEGAS BENITO	","correo":"	benitozunigalp4@aragon.unam.mx	       " },
{"nombre":"		","correo":"		       " },


    ];

    const tbody = document.querySelector("#tablaCorreos tbody");

    function cargarTabla(lista) {
        tbody.innerHTML = "";
        lista.forEach(persona => {
            const fila = document.createElement("tr");
            fila.innerHTML = \`
                <td>\${persona.nombre}</td>
                <td>
                    <a href="mailto:\${persona.correo}">
                        \${persona.correo}
                    </a>
                </td>
            \`;
            tbody.appendChild(fila);
        });
    }

    function filtrarTabla() {
        const texto = document.getElementById("buscador").value.toLowerCase();
        const filtrados = datos.filter(persona =>
            persona.nombre.toLowerCase().includes(texto)
        );
        cargarTabla(filtrados);
    }

    cargarTabla(datos);
</script>

</body>
</html>

`

type ProfesoresCorreoProps = {
  readonly iframeTitle?: string
}

export function ProfesoresCorreo({ iframeTitle = 'Directorio de correos del profesorado' }: ProfesoresCorreoProps) {
  return (
    <ContenidoHtml
      html={html}
      title={iframeTitle}
      className="profesores-correo"
      sandbox="allow-same-origin allow-scripts"
      iframeStyle={{ minHeight: 'min(85vh, 1400px)' }}
    />
  )
}
