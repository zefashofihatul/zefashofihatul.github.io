export const dataKlasemen = ({pos, logo, name, won, lose, draw, points}) => {
	return `
	<tr>
        <td class="text-center">${pos}</td>
        <td class="center"><img id="klasemenLogo" src="${logo}" alt="" /></td>
        <td>${name}</td>
        <td>${won}</td>
        <td>${draw}</td>
        <td>${lose}</td>
        <td>${points}</td>
    </tr>`;
}