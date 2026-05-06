export const bankLabel = (code) => {
  const map = {
    bca_va: "BCA",
    bni_va: "BNI",
    bri_va: "BRI",
    permata_va: "Permata",
    cimb_va: "CIMB Niaga",
    echannel: "Mandiri",
  };

  return map[code] ?? code?.toUpperCase();
};
