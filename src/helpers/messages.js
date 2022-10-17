module.exports = {
  success200: (data) => {
    if (data !== undefined) return { code: 200, status: "OK", data: data };
    return { code: 200, status: "OK" };
  },
  success201: (data) => {
    if (data !== undefined) return { code: 201, status: "CREATED", data: data };
    return { code: 201, status: "CREATED" };
  },
  err400: (message) => {
    if (message !== undefined)
      return { code: 400, status: "BAD REQUEST", message: message };
    return { code: 400, status: "BAD REQUEST" };
  },
  err404: (message) => {
    if (message !== undefined)
      return { code: 404, status: "NOT FOUND", message: message };
    return { code: 404, status: "NOT FOUND" };
  },
  entryPoint: () => {
    return {
      BASE_URL: "http://localhost:3001/api/v1",
      PERKIRAAN: [
        {
          METHOD: "GET",
          getAll: {
            URL: "http://localhost:3001/api/v1/perkiraan",
            payload: null,
          },
          getByKode: {
            URL: "http://localhost:3001/api/v1/perkiraan/103",
            payload: null,
          },
          search: {
            URL: "http://localhost:3001/api/v1/perkiraan/search?nama_perkiraan=biaya",
            payload: null,
          },
        },
        {
          METHOD: "POST",
          createPerkiraan: {
            URL: "http://localhost:3001/api/v1/perkiraan",
            payload: {
              kode_perkiraan: "String",
              nama_perkiraan: "String",
              kelompok_akun: "String",
            },
          },
        },
        {
          METHOD: "PUT",
          updatePerkiraan: {
            URL: "http://localhost:3001/api/v1/perkiraan/103",
            payload: {
              kode_perkiraan: "String",
              nama_perkiraan: "String",
              kelompok_akun: "String",
            },
          },
        },
        {
          METHOD: "DELETE",
          deletePerkiraan: {
            URL: "http://localhost:3001/api/v1/perkiraan/delete/999",
            payload: null,
          },
        },
      ],
      JURNAL: [
        {
          METHOD: "GET",
          getAll: {
            URL: "http://localhost:3001/api/v1/jurnal",
            payload: null,
          },
        },
        {
          METHOD: "POST",
          createPerkiraan: {
            URL: "http://localhost:3001/api/v1/jurnal",
            payload: {
              tanggalJurnal: "Date",
              uraian: "String",
              nomerBukti: "Number",
              namaPerkiraanJurnal: "String",
              debet: "Number",
              kredit: "Number",
            },
            example: {
              tanggalJurnal: "2022-10-16",
              uraian: "kas untuk modal",
              nomerBukti: 1,
              namaPerkiraanJurnal: "kas",
              debet: 1000000,
              kredit: 0,
            },
            result: {
              code: 201,
              status: "CREATED",
              data: {
                tanggalJurnal: "2022-10-16T00:00:00.000Z",
                uraian: "KAS UNTUK MODAL",
                nomerBukti: "NB-0001",
                kodePerkiraan: "101",
                namaPerkiraanJurnal: "KAS",
                debet: 1000000,
                kredit: 0,
                _id: "634dc7369618496f877a0654",
              },
            },
          },
        },
      ],
    };
  },
};
