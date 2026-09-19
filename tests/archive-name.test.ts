// SPDX-FileCopyrightText: 2026 Numen Games S.L.
// SPDX-License-Identifier: MIT
//
// El archivo se llamaba numengames/numinia-nwos y es numengames/numinia-archive
// desde 2026-09-17. GitHub redirige el nombre viejo hoy; el día que alguien cree
// un repositorio llamado numinia-nwos, los enlaces que aún lo escriban así caen
// en código ajeno. Este test fija los tres documentos que enlazan el archivo.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// En dos mitades, para que este fichero no se encuentre a sí mismo.
const VIEJO = ["numengames", "numinia-nwos"].join("/");
const NUEVO = "numengames/numinia-archive";

describe("el nombre del archivo", () => {
	it.each(["README.md", "CONTRIBUTING.md", "CLAUDE.md"])(
		"%s enlaza el archivo por su nombre actual",
		(file) => {
			const text = readFileSync(file, "utf8");
			expect(text).toContain(NUEVO);
			expect(text).not.toContain(VIEJO);
		},
	);
});
