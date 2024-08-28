// const brand = await supabase.from('brand').select()

// const dataCar = carType.map(item => {
//   const getBrand = brand.data?.find(bra => bra.key == item.brand)
//   return {
//     name: item.name,
//     key: item.key,
//     brand_id: getBrand?.id,
//     model: item.model,
//     version: item.version,
//     code: item.code
//   }
// })

// const ddddd = await supabase.from('carType').insert(dataCar).select()
// console.log('cccccccc', ddddd)
export const brand = [
  {
    name: 'Toyota',
    image:
      'https://drive.google.com/file/d/1VzAyzGln8S1ggNxvPxzMtnKh9pR6uaN2/view?usp=drive_link',
    key: 'TOYOTA'
  },
  {
    name: 'Honda',
    image:
      'https://drive.google.com/file/d/1hIAdAutevznyhlRmhCLeLgpvqszmMheB/view?usp=drive_link',
    key: 'HONDA'
  },
  {
    name: 'Mazda',
    image:
      'https://drive.google.com/file/d/1ita3Pqvi-PiVWGgSfiFooGlSu6Xy4yWI/view?usp=drive_link',
    key: 'MAZDA'
  },
  {
    name: 'Hyundai',
    image:
      'https://drive.google.com/file/d/1nSM3KWPtsNdb5uRloUeXJpCbFXl1myfO/view?usp=drive_link',
    key: 'HYUNDAI'
  },
  {
    name: 'Kia',
    image:
      'https://drive.google.com/file/d/1KU0NkNduCKc1Gql2JxeLT2r8xelqqPR4/view?usp=drive_link',
    key: 'KIA'
  },
  {
    name: 'Ford',
    image:
      'https://drive.google.com/file/d/1v2xNdOce4mnLZaMJk0T4rBY-UnNbLb0S/view?usp=drive_link',
    key: 'FORD'
  },
  {
    name: 'Mitsubishi',
    image:
      'https://drive.google.com/file/d/16Uh4EVXGmcmo1jmkATuTbt0IXAkWk_Qd/view?usp=drive_link',
    key: 'MITSUBISHI'
  },
  {
    name: 'VinFast',
    image:
      'https://drive.google.com/file/d/1z3F0xXpsdTXEi23Sj3aEocHw_YvDLKjN/view?usp=drive_link',
    key: 'VINFAST'
  },
  {
    name: 'Nissan',
    image:
      'https://drive.google.com/file/d/1XXXjtQPFbRTkwTuLMlNyrTYOesWrv6q2/view?usp=drive_link',
    key: 'NISSAN'
  },
  {
    name: 'Chevrolet',
    image:
      'https://drive.google.com/file/d/14EuayGWrWqQqtSQs--3DGNDPiCh6MYyR/view?usp=drive_link',
    key: 'CHEVROLET'
  },
  {
    name: 'Mercedes-Benz',
    image:
      'https://drive.google.com/file/d/1WyJp8ASzVipAfxuLDppFUrvzeUI9-rdM/view?usp=drive_link',
    key: 'MERCEDES_BENZ'
  },
  {
    name: 'BMW',
    image:
      'https://drive.google.com/file/d/13GmHv68PS9JLX3tlp7QfguLyf34ygliC/view?usp=sharing',
    key: 'BMW'
  },
  {
    name: 'Audi',
    image:
      'https://drive.google.com/file/d/1OV4CwreGJ0ribXX31s_qkkvOO9BA31Mo/view?usp=sharing',
    key: 'AUDI'
  },
  {
    name: 'Lexus',
    image:
      'https://drive.google.com/file/d/1RAZTjANuGENzWCaJSYPx-3m3OmCea5_M/view?usp=drive_link',
    key: 'LEXUS'
  },
  {
    name: 'Peugeot',
    image:
      'https://drive.google.com/file/d/1LIylVfDKUpqnTlGwIjOS5Bf6_sQGczdW/view?usp=drive_link',
    key: 'PEUGEOT'
  },
  {
    name: 'Subaru',
    image:
      'https://drive.google.com/file/d/12PrsgBIwdQjT2laojKXGNJPAioXAwGac/view?usp=drive_link',
    key: 'SUBARU'
  },
  {
    name: 'Suzuki',
    image:
      'https://drive.google.com/file/d/1XYruDLiXwMKvYAAuc-bY4Fxy4UrjLf0N/view?usp=drive_link',
    key: 'SUZUKI'
  },
  {
    name: 'Range Rover',
    image:
      'https://drive.google.com/file/d/15PNpWko8XUIs5byql6nEh-4i-aFlno8m/view?usp=drive_link',
    key: 'RANGE_ROVER'
  },
  {
    name: 'Volvo',
    image:
      'https://drive.google.com/file/d/1V0mGl2aODCNTNCPTHST4n4AEQm_MpPHU/view?usp=drive_link',
    key: 'VOLVO'
  },
  {
    name: 'Porsche',
    image:
      'https://drive.google.com/file/d/1G-VctJn7MiSEQp9I43QGP0nGsd4xFJ47/view?usp=drive_link',
    key: 'PORSCHE'
  }
]

export const carType = [
  {
    name: 'Acura MDX SH-AWD',
    brand: 'ACURA',
    model: 'MDX',
    version: 'SH-AWD',
    code: 'X00001',
    key: 'ACURA_MDX_SH_AWD'
  },
  {
    name: 'Audi A1 1.4 TFSI',
    brand: 'AUDI',
    model: 'A1',
    version: '1.4 TFSI',
    code: 'X00002',
    key: 'AUDI_A1_1_4_TFSI'
  },
  {
    name: 'Audi A3 1.8 AT',
    brand: 'AUDI',
    model: 'A3',
    version: '1.8 AT',
    code: 'X00003',
    key: 'AUDI_A3_1_8_AT'
  },
  {
    name: 'Audi A4 2.0 TFSI',
    brand: 'AUDI',
    model: 'A4',
    version: '2.0 TFSI',
    code: 'X00004',
    key: 'AUDI_A4_2_0_TFSI'
  },
  {
    name: 'Audi A4 40 TFSI Advanced',
    brand: 'AUDI',
    model: 'A4',
    version: '40 TFSI Advanced',
    code: 'X00005',
    key: 'AUDI_A4_40_TFSI_ADVANCED'
  },
  {
    name: 'Audi A5 Sportback 2.0',
    brand: 'AUDI',
    model: 'A5',
    version: 'Sportback 2.0',
    code: 'X00006',
    key: 'AUDI_A5_SPORTBACK_2_0'
  },
  {
    name: 'Audi A6',
    brand: 'AUDI',
    model: 'A6',
    version: '#VALUE!',
    code: 'X00007',
    key: 'AUDI_A6'
  },
  {
    name: 'Audi A7 3.0 TFSI',
    brand: 'AUDI',
    model: 'A7',
    version: '3.0 TFSI',
    code: 'X00008',
    key: 'AUDI_A7_3_0_TFSI'
  },
  {
    name: 'Audi A8 L 3.0 Quattro',
    brand: 'AUDI',
    model: 'A8',
    version: 'L 3.0 Quattro',
    code: 'X00009',
    key: 'AUDI_A8_L_3_0_QUATTRO'
  },
  {
    name: 'Audi A8 L V8 4.0L TFSI',
    brand: 'AUDI',
    model: 'A8',
    version: 'L V8 4.0L TFSI',
    code: 'X00010',
    key: 'AUDI_A8_L_V8_4_0L_TFSI'
  },
  {
    name: 'Audi Q3 Exclusive 2.0 TFSI Quattro',
    brand: 'AUDI',
    model: 'Q3',
    version: 'Exclusive 2.0 TFSI Quattro',
    code: 'X00011',
    key: 'AUDI_Q3_EXCLUSIVE_2_0_TFSI_QUATTRO'
  },
  {
    name: 'Audi Q5',
    brand: 'AUDI',
    model: 'Q5',
    version: '#VALUE!',
    code: 'X00012',
    key: 'AUDI_Q5'
  },
  {
    name: 'Audi Q5 2.0 AT',
    brand: 'AUDI',
    model: 'Q5',
    version: '2.0 AT',
    code: 'X00013',
    key: 'AUDI_Q5_2_0_AT'
  },
  {
    name: 'Audi Q5 45 TFSI Quattro',
    brand: 'AUDI',
    model: 'Q5',
    version: '45 TFSI Quattro',
    code: 'X00014',
    key: 'AUDI_Q5_45_TFSI_QUATTRO'
  },
  {
    name: 'Audi Q7 2.0 AT',
    brand: 'AUDI',
    model: 'Q7',
    version: '2.0 AT',
    code: 'X00015',
    key: 'AUDI_Q7_2_0_AT'
  },
  {
    name: 'Audi Q7 3.0 AT',
    brand: 'AUDI',
    model: 'Q7',
    version: '3.0 AT',
    code: 'X00016',
    key: 'AUDI_Q7_3_0_AT'
  },
  {
    name: 'Audi Q8 55 TFSI S-Line Quattro',
    brand: 'AUDI',
    model: 'Q8',
    version: '55 TFSI S-Line Quattro',
    code: 'X00017',
    key: 'AUDI_Q8_55_TFSI_S_LINE_QUATTRO'
  },
  {
    name: 'Audi Q8 Etron',
    brand: 'AUDI',
    model: 'Q8',
    version: 'Etron',
    code: 'X00018',
    key: 'AUDI_Q8_ETRON'
  },
  {
    name: 'Audi TT 2.0 AT',
    brand: 'AUDI',
    model: 'TT',
    version: '2.0 AT',
    code: 'X00019',
    key: 'AUDI_TT_2_0_AT'
  },
  {
    name: 'Audi TT S 2.0 AT',
    brand: 'AUDI',
    model: 'TT',
    version: 'S 2.0 AT',
    code: 'X00020',
    key: 'AUDI_TT_S_2_0_AT'
  },
  {
    name: 'Baic Beijing X7 Premium 1.5 AT',
    brand: 'BAIC',
    model: 'Beijing',
    version: 'X7 Premium 1.5 AT',
    code: 'X00021',
    key: 'BAIC_BEIJING_X7_PREMIUM_1_5_AT'
  },
  {
    name: 'Bentley Continental GT',
    brand: 'BENTLEY',
    model: 'Continental',
    version: 'GT',
    code: 'X00022',
    key: 'BENTLEY_CONTINENTAL_GT'
  },
  {
    name: 'Bentley Continental GTC',
    brand: 'BENTLEY',
    model: 'Continental',
    version: 'GTC',
    code: 'X00023',
    key: 'BENTLEY_CONTINENTAL_GTC'
  },
  {
    name: 'Bentley Flying Spur V8',
    brand: 'BENTLEY',
    model: 'Flying',
    version: 'Spur V8',
    code: 'X00024',
    key: 'BENTLEY_FLYING_SPUR_V8'
  },
  {
    name: 'Bentley Flying Spur W12 S',
    brand: 'BENTLEY',
    model: 'Flying',
    version: 'Spur W12 S',
    code: 'X00025',
    key: 'BENTLEY_FLYING_SPUR_W12_S'
  },
  {
    name: 'Bentley Mulsanne 6.8 V8',
    brand: 'BENTLEY',
    model: 'Mulsanne',
    version: '6.8 V8',
    code: 'X00026',
    key: 'BENTLEY_MULSANNE_6_8_V8'
  },
  {
    name: 'Bentley Mulsanne EWB',
    brand: 'BENTLEY',
    model: 'Mulsanne',
    version: 'EWB',
    code: 'X00027',
    key: 'BENTLEY_MULSANNE_EWB'
  },
  {
    name: 'Bentley Mulsanne Speed',
    brand: 'BENTLEY',
    model: 'Mulsanne',
    version: 'Speed',
    code: 'X00028',
    key: 'BENTLEY_MULSANNE_SPEED'
  },
  {
    name: 'BMW 2 Series 218i Active Tourer',
    brand: 'BMW',
    model: '2 Series',
    version: 'Series 218i Active Tourer',
    code: 'X00029',
    key: 'BMW_2_SERIES_218I_ACTIVE_TOURER'
  },
  {
    name: 'BMW 3 Series 318i',
    brand: 'BMW',
    model: '3 Series',
    version: 'Series 318i',
    code: 'X00030',
    key: 'BMW_3_SERIES_318I'
  },
  {
    name: 'BMW 3 Series 318i AT',
    brand: 'BMW',
    model: '3 Series',
    version: 'Series 318i AT',
    code: 'X00031',
    key: 'BMW_3_SERIES_318I_AT'
  },
  {
    name: 'BMW 3 Series 320i',
    brand: 'BMW',
    model: '3 Series',
    version: 'Series 320i',
    code: 'X00032',
    key: 'BMW_3_SERIES_320I'
  },
  {
    name: 'BMW 3 Series 320i GT',
    brand: 'BMW',
    model: '3 Series',
    version: 'Series 320i GT',
    code: 'X00033',
    key: 'BMW_3_SERIES_320I_GT'
  },
  {
    name: 'BMW 3 Series 325i',
    brand: 'BMW',
    model: '3 Series',
    version: 'Series 325i',
    code: 'X00034',
    key: 'BMW_3_SERIES_325I'
  },
  {
    name: 'BMW 3 Series 330i M Sport',
    brand: 'BMW',
    model: '3 Series',
    version: 'Series 330i M Sport',
    code: 'X00035',
    key: 'BMW_3_SERIES_330I_M_SPORT'
  },
  {
    name: 'BMW 4 Series 420i Coupe',
    brand: 'BMW',
    model: '4 Series',
    version: 'Series 420i Coupe',
    code: 'X00036',
    key: 'BMW_4_SERIES_420I_COUPE'
  },
  {
    name: 'BMW 4 Series 430i Convertible M Sport',
    brand: 'BMW',
    model: '4 Series',
    version: 'Series 430i Convertible M Sport',
    code: 'X00037',
    key: 'BMW_4_SERIES_430I_CONVERTIBLE_M_SPORT'
  },
  {
    name: 'BMW 4 Series 430i Gran Coupe M Sport',
    brand: 'BMW',
    model: '4 Series',
    version: 'Series 430i Gran Coupe M Sport',
    code: 'X00038',
    key: 'BMW_4_SERIES_430I_GRAN_COUPE_M_SPORT'
  },
  {
    name: 'BMW 5 Series 520i',
    brand: 'BMW',
    model: '5 Series',
    version: 'Series 520i',
    code: 'X00039',
    key: 'BMW_5_SERIES_520I'
  },
  {
    name: 'BMW 5 Series 523i',
    brand: 'BMW',
    model: '5 Series',
    version: 'Series 523i',
    code: 'X00040',
    key: 'BMW_5_SERIES_523I'
  },
  {
    name: 'BMW 5 Series 530i Luxury Line',
    brand: 'BMW',
    model: '5 Series',
    version: 'Series 530i Luxury Line',
    code: 'X00041',
    key: 'BMW_5_SERIES_530I_LUXURY_LINE'
  },
  {
    name: 'BMW 5 Series 530i M Sport',
    brand: 'BMW',
    model: '5 Series',
    version: 'Series 530i M Sport',
    code: 'X00042',
    key: 'BMW_5_SERIES_530I_M_SPORT'
  },
  {
    name: 'BMW 7 Series 730Li',
    brand: 'BMW',
    model: '7 Series',
    version: 'Series 730Li',
    code: 'X00043',
    key: 'BMW_7_SERIES_730LI'
  },
  {
    name: 'BMW 7 Series 730Li M Sport',
    brand: 'BMW',
    model: '7 Series',
    version: 'Series 730Li M Sport',
    code: 'X00044',
    key: 'BMW_7_SERIES_730LI_M_SPORT'
  },
  {
    name: 'BMW 7 Series 740Li',
    brand: 'BMW',
    model: '7 Series',
    version: 'Series 740Li',
    code: 'X00045',
    key: 'BMW_7_SERIES_740LI'
  },
  {
    name: 'BMW 7 Series 750Li',
    brand: 'BMW',
    model: '7 Series',
    version: 'Series 750Li',
    code: 'X00046',
    key: 'BMW_7_SERIES_750LI'
  },
  {
    name: 'BMW X1 sDrive18i',
    brand: 'BMW',
    model: 'X1',
    version: 'sDrive18i',
    code: 'X00047',
    key: 'BMW_X1_SDRIVE18I'
  },
  {
    name: 'BMW X3 sDrive20i',
    brand: 'BMW',
    model: 'X3',
    version: 'sDrive20i',
    code: 'X00048',
    key: 'BMW_X3_SDRIVE20I'
  },
  {
    name: 'BMW X3 sDrive20i M Sport',
    brand: 'BMW',
    model: 'X3',
    version: 'sDrive20i M Sport',
    code: 'X00049',
    key: 'BMW_X3_SDRIVE20I_M_SPORT'
  },
  {
    name: 'BMW X3 xDrive20i',
    brand: 'BMW',
    model: 'X3',
    version: 'xDrive20i',
    code: 'X00050',
    key: 'BMW_X3_XDRIVE20I'
  },
  {
    name: 'BMW X3 xDrive20i xLine',
    brand: 'BMW',
    model: 'X3',
    version: 'xDrive20i xLine',
    code: 'X00051',
    key: 'BMW_X3_XDRIVE20I_XLINE'
  },
  {
    name: 'BMW X4 xDrive20i',
    brand: 'BMW',
    model: 'X4',
    version: 'xDrive20i',
    code: 'X00052',
    key: 'BMW_X4_XDRIVE20I'
  },
  {
    name: 'BMW X4 xDrive20i M Sport',
    brand: 'BMW',
    model: 'X4',
    version: 'xDrive20i M Sport',
    code: 'X00053',
    key: 'BMW_X4_XDRIVE20I_M_SPORT'
  },
  {
    name: 'BMW X5 3.0si',
    brand: 'BMW',
    model: 'X5',
    version: '3.0si',
    code: 'X00054',
    key: 'BMW_X5_3_0SI'
  },
  {
    name: 'BMW X5 xDrive35i',
    brand: 'BMW',
    model: 'X5',
    version: 'xDrive35i',
    code: 'X00055',
    key: 'BMW_X5_XDRIVE35I'
  },
  {
    name: 'BMW X5 xDrive40i M Sport',
    brand: 'BMW',
    model: 'X5',
    version: 'xDrive40i M Sport',
    code: 'X00056',
    key: 'BMW_X5_XDRIVE40I_M_SPORT'
  },
  {
    name: 'BMW X5 xDrive40i xLine',
    brand: 'BMW',
    model: 'X5',
    version: 'xDrive40i xLine',
    code: 'X00057',
    key: 'BMW_X5_XDRIVE40I_XLINE'
  },
  {
    name: 'BMW X6 xDrive35i',
    brand: 'BMW',
    model: 'X6',
    version: 'xDrive35i',
    code: 'X00058',
    key: 'BMW_X6_XDRIVE35I'
  },
  {
    name: 'BMW X6 xDrive40i M Sport',
    brand: 'BMW',
    model: 'X6',
    version: 'xDrive40i M Sport',
    code: 'X00059',
    key: 'BMW_X6_XDRIVE40I_M_SPORT'
  },
  {
    name: 'BMW X6 xDrive50i',
    brand: 'BMW',
    model: 'X6',
    version: 'xDrive50i',
    code: 'X00060',
    key: 'BMW_X6_XDRIVE50I'
  },
  {
    name: 'BMW X7 xDrive40i',
    brand: 'BMW',
    model: 'X7',
    version: 'xDrive40i',
    code: 'X00061',
    key: 'BMW_X7_XDRIVE40I'
  },
  {
    name: 'BMW X7 xDrive40i 2020',
    brand: 'BMW',
    model: 'X7',
    version: 'xDrive40i 2020',
    code: 'X00062',
    key: 'BMW_X7_XDRIVE40I_2020'
  },
  {
    name: 'BMW X7 xDrive40i M Sport',
    brand: 'BMW',
    model: 'X7',
    version: 'xDrive40i M Sport',
    code: 'X00063',
    key: 'BMW_X7_XDRIVE40I_M_SPORT'
  },
  {
    name: 'BMW Z4 sDrive30i M Sport',
    brand: 'BMW',
    model: 'Z4',
    version: 'sDrive30i M Sport',
    code: 'X00064',
    key: 'BMW_Z4_SDRIVE30I_M_SPORT'
  },
  {
    name: 'Cadillac Escalade 6.2 V8',
    brand: 'CADILLAC',
    model: 'Escalade',
    version: '6.2 V8',
    code: 'X00065',
    key: 'CADILLAC_ESCALADE_6_2_V8'
  },
  {
    name: 'Cadillac Escalade ESV Platinum',
    brand: 'CADILLAC',
    model: 'Escalade',
    version: 'ESV Platinum',
    code: 'X00066',
    key: 'CADILLAC_ESCALADE_ESV_PLATINUM'
  },
  {
    name: 'Cadillac Escalade ESV Premium',
    brand: 'CADILLAC',
    model: 'Escalade',
    version: 'ESV Premium',
    code: 'X00067',
    key: 'CADILLAC_ESCALADE_ESV_PREMIUM'
  },
  {
    name: 'Cadillac SRX 3.0 V6',
    brand: 'CADILLAC',
    model: 'SRX',
    version: '3.0 V6',
    code: 'X00068',
    key: 'CADILLAC_SRX_3_0_V6'
  },
  {
    name: 'Chevrolet Aveo LT 1.4 MT',
    brand: 'CHEVROLET',
    model: 'Aveo',
    version: 'LT 1.4 MT',
    code: 'X00069',
    key: 'CHEVROLET_AVEO_LT_1_4_MT'
  },
  {
    name: 'Chevrolet Aveo LT 1.5 MT',
    brand: 'CHEVROLET',
    model: 'Aveo',
    version: 'LT 1.5 MT',
    code: 'X00070',
    key: 'CHEVROLET_AVEO_LT_1_5_MT'
  },
  {
    name: 'Chevrolet Aveo LTZ 1.5 AT',
    brand: 'CHEVROLET',
    model: 'Aveo',
    version: 'LTZ 1.5 AT',
    code: 'X00071',
    key: 'CHEVROLET_AVEO_LTZ_1_5_AT'
  },
  {
    name: 'Chevrolet Camaro 2.0 Turbo',
    brand: 'CHEVROLET',
    model: 'Camaro',
    version: '2.0 Turbo',
    code: 'X00072',
    key: 'CHEVROLET_CAMARO_2_0_TURBO'
  },
  {
    name: 'Chevrolet Captiva LT 2.4 MT',
    brand: 'CHEVROLET',
    model: 'Captiva',
    version: 'LT 2.4 MT',
    code: 'X00073',
    key: 'CHEVROLET_CAPTIVA_LT_2_4_MT'
  },
  {
    name: 'Chevrolet Captiva LTZ 2.4 AT',
    brand: 'CHEVROLET',
    model: 'Captiva',
    version: 'LTZ 2.4 AT',
    code: 'X00074',
    key: 'CHEVROLET_CAPTIVA_LTZ_2_4_AT'
  },
  {
    name: 'Chevrolet Captiva LTZ Maxx 2.4 AT',
    brand: 'CHEVROLET',
    model: 'Captiva',
    version: 'LTZ Maxx 2.4 AT',
    code: 'X00075',
    key: 'CHEVROLET_CAPTIVA_LTZ_MAXX_2_4_AT'
  },
  {
    name: 'Chevrolet Captiva Revv LTZ 2.4 AT',
    brand: 'CHEVROLET',
    model: 'Captiva',
    version: 'Revv LTZ 2.4 AT',
    code: 'X00076',
    key: 'CHEVROLET_CAPTIVA_REVV_LTZ_2_4_AT'
  },
  {
    name: 'Chevrolet Colorado High Country 2.5L 4x4 AT',
    brand: 'CHEVROLET',
    model: 'Colorado',
    version: 'High Country 2.5L 4x4 AT',
    code: 'X00077',
    key: 'CHEVROLET_COLORADO_HIGH_COUNTRY_2_5L_4X4_AT'
  },
  {
    name: 'Chevrolet Colorado LT 2.5L 4x2 AT',
    brand: 'CHEVROLET',
    model: 'Colorado',
    version: 'LT 2.5L 4x2 AT',
    code: 'X00078',
    key: 'CHEVROLET_COLORADO_LT_2_5L_4X2_AT'
  },
  {
    name: 'Chevrolet Colorado LT 2.5L 4x4 MT',
    brand: 'CHEVROLET',
    model: 'Colorado',
    version: 'LT 2.5L 4x4 MT',
    code: 'X00079',
    key: 'CHEVROLET_COLORADO_LT_2_5L_4X4_MT'
  },
  {
    name: 'Chevrolet Colorado LTZ 2.5L 4x4 AT',
    brand: 'CHEVROLET',
    model: 'Colorado',
    version: 'LTZ 2.5L 4x4 AT',
    code: 'X00080',
    key: 'CHEVROLET_COLORADO_LTZ_2_5L_4X4_AT'
  },
  {
    name: 'Chevrolet Colorado LTZ 2.8L 4x4 AT',
    brand: 'CHEVROLET',
    model: 'Colorado',
    version: 'LTZ 2.8L 4x4 AT',
    code: 'X00081',
    key: 'CHEVROLET_COLORADO_LTZ_2_8L_4X4_AT'
  },
  {
    name: 'Chevrolet Colorado LTZ 2.8L 4x4 MT',
    brand: 'CHEVROLET',
    model: 'Colorado',
    version: 'LTZ 2.8L 4x4 MT',
    code: 'X00082',
    key: 'CHEVROLET_COLORADO_LTZ_2_8L_4X4_MT'
  },
  {
    name: 'Chevrolet Cruze LS 1.6 MT',
    brand: 'CHEVROLET',
    model: 'Cruze',
    version: 'LS 1.6 MT',
    code: 'X00083',
    key: 'CHEVROLET_CRUZE_LS_1_6_MT'
  },
  {
    name: 'Chevrolet Cruze LTZ 1.8 AT',
    brand: 'CHEVROLET',
    model: 'Cruze',
    version: 'LTZ 1.8 AT',
    code: 'X00084',
    key: 'CHEVROLET_CRUZE_LTZ_1_8_AT'
  },
  {
    name: 'Chevrolet Lacetti 1.6',
    brand: 'CHEVROLET',
    model: 'Lacetti',
    version: 1.6,
    code: 'X00085',
    key: 'CHEVROLET_LACETTI_1_6'
  },
  {
    name: 'Chevrolet Orlando LT 1.8 MT',
    brand: 'CHEVROLET',
    code: 'X00950',
    key: 'CHEVROLET_ORLANDO_LT_1_8_MT'
  },
  {
    name: 'Chevrolet Spark Duo Van 1.2 MT',
    brand: 'CHEVROLET',
    model: 'Spark',
    version: 'Duo Van 1.2 MT',
    code: 'X00086',
    key: 'CHEVROLET_SPARK_DUO_VAN_1_2_MT'
  },
  {
    name: 'Chevrolet Spark Lite Van 0.8 MT',
    brand: 'CHEVROLET',
    model: 'Spark',
    version: 'Lite Van 0.8 MT',
    code: 'X00087',
    key: 'CHEVROLET_SPARK_LITE_VAN_0_8_MT'
  },
  {
    name: 'Chevrolet Spark LS 1.2 MT',
    brand: 'CHEVROLET',
    model: 'Spark',
    version: 'LS 1.2 MT',
    code: 'X00088',
    key: 'CHEVROLET_SPARK_LS_1_2_MT'
  },
  {
    name: 'Chevrolet Spark LT 0.8 MT',
    brand: 'CHEVROLET',
    model: 'Spark',
    version: 'LT 0.8 MT',
    code: 'X00089',
    key: 'CHEVROLET_SPARK_LT_0_8_MT'
  },
  {
    name: 'Chevrolet Spark LTZ 1.0 AT Zest',
    brand: 'CHEVROLET',
    model: 'Spark',
    version: 'LTZ 1.0 AT Zest',
    code: 'X00090',
    key: 'CHEVROLET_SPARK_LTZ_1_0_AT_ZEST'
  },
  {
    name: 'Chevrolet Spark Van 0.8 MT',
    brand: 'CHEVROLET',
    model: 'Spark',
    version: 'Van 0.8 MT',
    code: 'X00091',
    key: 'CHEVROLET_SPARK_VAN_0_8_MT'
  },
  {
    name: 'Chevrolet Spark Van 1.0 AT',
    brand: 'CHEVROLET',
    model: 'Spark',
    version: 'Van 1.0 AT',
    code: 'X00092',
    key: 'CHEVROLET_SPARK_VAN_1_0_AT'
  },
  {
    name: 'Chevrolet Trailblazer LT 2.5L VGT 4x2 AT',
    brand: 'CHEVROLET',
    model: 'Trailblazer',
    version: 'LT 2.5L VGT 4x2 AT',
    code: 'X00093',
    key: 'CHEVROLET_TRAILBLAZER_LT_2_5L_VGT_4X2_AT'
  },
  {
    name: 'Chevrolet Trailblazer LTZ 2.5L VGT 4x4 AT',
    brand: 'CHEVROLET',
    model: 'Trailblazer',
    version: 'LTZ 2.5L VGT 4x4 AT',
    code: 'X00094',
    key: 'CHEVROLET_TRAILBLAZER_LTZ_2_5L_VGT_4X4_AT'
  },
  {
    name: 'Chevrolet Vivant CDX AT',
    brand: 'CHEVROLET',
    model: 'Vivant',
    version: 'CDX AT',
    code: 'X00095',
    key: 'CHEVROLET_VIVANT_CDX_AT'
  },
  {
    name: 'Daewoo Lacetti CDX 1.6 AT',
    brand: 'DAEWOO',
    model: 'Lacetti',
    version: 'CDX 1.6 AT',
    code: 'X00096',
    key: 'DAEWOO_LACETTI_CDX_1_6_AT'
  },
  {
    name: 'Daewoo Lacetti EX',
    brand: 'DAEWOO',
    model: 'Lacetti',
    version: 'EX',
    code: 'X00097',
    key: 'DAEWOO_LACETTI_EX'
  },
  {
    name: 'Daewoo Lacetti EX 1.6 MT',
    brand: 'DAEWOO',
    code: 'X00969',
    key: 'DAEWOO_LACETTI_EX_1_6_MT'
  },
  {
    name: 'Daewoo Lacetti SE',
    brand: 'DAEWOO',
    model: 'Lacetti',
    version: 'SE',
    code: 'X00098',
    key: 'DAEWOO_LACETTI_SE'
  },
  {
    name: 'Daewoo Lanos SX',
    brand: 'DAEWOO',
    model: 'Lanos',
    version: 'SX',
    code: 'X00099',
    key: 'DAEWOO_LANOS_SX'
  },
  {
    name: 'Daewoo Magnus 2.5 AT',
    brand: 'DAEWOO',
    model: 'Magnus',
    version: '2.5 AT',
    code: 'X00100',
    key: 'DAEWOO_MAGNUS_2_5_AT'
  },
  {
    name: 'Daewoo Matiz 0.8 MT',
    brand: 'DAEWOO',
    model: 'Matiz',
    version: '0.8 MT',
    code: 'X00101',
    key: 'DAEWOO_MATIZ_0_8_MT'
  },
  {
    name: 'Daewoo Matiz Groove 1.0 AT',
    brand: 'DAEWOO',
    model: 'Matiz',
    version: 'Groove 1.0 AT',
    code: 'X00102',
    key: 'DAEWOO_MATIZ_GROOVE_1_0_AT'
  },
  {
    name: 'Daewoo Matiz Joy 0.8 AT',
    brand: 'DAEWOO',
    model: 'Matiz',
    version: 'Joy 0.8 AT',
    code: 'X00103',
    key: 'DAEWOO_MATIZ_JOY_0_8_AT'
  },
  {
    name: 'Daewoo Matiz S 0.8 MT',
    brand: 'DAEWOO',
    model: 'Matiz',
    version: 'S 0.8 MT',
    code: 'X00104',
    key: 'DAEWOO_MATIZ_S_0_8_MT'
  },
  {
    name: 'Daewoo Matiz SE 0.8 MT',
    brand: 'DAEWOO',
    model: 'Matiz',
    version: 'SE 0.8 MT',
    code: 'X00105',
    key: 'DAEWOO_MATIZ_SE_0_8_MT'
  },
  {
    name: 'Daewoo Nubira II 1.6',
    brand: 'DAEWOO',
    model: 'Nubira',
    version: 'II 1.6',
    code: 'X00106',
    key: 'DAEWOO_NUBIRA_II_1_6'
  },
  {
    name: 'Dodge Journey R/T 2.7 V6',
    brand: 'DODGE',
    model: 'Journey',
    version: 'R/T 2.7 V6',
    code: 'X00107',
    key: 'DODGE_JOURNEY_R_T_2_7_V6'
  },
  {
    name: 'Ferrari 296 GTB',
    brand: 'FERRARI',
    model: 296,
    version: 'GTB',
    code: 'X00108',
    key: 'FERRARI_296_GTB'
  },
  {
    name: 'Ferrari Portofino M 3.9 V8',
    brand: 'FERRARI',
    model: 'Portofino',
    version: 'M 3.9 V8',
    code: 'X00109',
    key: 'FERRARI_PORTOFINO_M_3_9_V8'
  },
  {
    name: 'Ford EcoSport Ambiente 1.5L AT',
    brand: 'FORD',
    code: 'X00951',
    key: 'FORD_ECOSPORT_AMBIENTE_1_5L_AT'
  },
  {
    name: 'Ford EcoSport Titanium 1.0 EcoBoost',
    brand: 'FORD',
    model: 'EcoSport',
    version: 'Titanium 1.0 EcoBoost',
    code: 'X00110',
    key: 'FORD_ECOSPORT_TITANIUM_1_0_ECOBOOST'
  },
  {
    name: 'Ford EcoSport Titanium 1.5L AT',
    brand: 'FORD',
    model: 'EcoSport',
    version: 'Titanium 1.5L AT',
    code: 'X00111',
    key: 'FORD_ECOSPORT_TITANIUM_1_5L_AT'
  },
  {
    name: 'Ford EcoSport Trend 1.5L AT',
    brand: 'FORD',
    model: 'EcoSport',
    version: 'Trend 1.5L AT',
    code: 'X00112',
    key: 'FORD_ECOSPORT_TREND_1_5L_AT'
  },
  {
    name: 'Ford EcoSport Trend 1.5L AT 2018',
    brand: 'FORD',
    model: 'EcoSport',
    version: 'Trend 1.5L AT 2018',
    code: 'X00113',
    key: 'FORD_ECOSPORT_TREND_1_5L_AT_2018'
  },
  {
    name: 'Ford Escape 3.0 V6',
    brand: 'FORD',
    model: 'Escape',
    version: '3.0 V6',
    code: 'X00114',
    key: 'FORD_ESCAPE_3_0_V6'
  },
  {
    name: 'Ford Escape XLS 2.3L 4x2 AT',
    brand: 'FORD',
    model: 'Escape',
    version: 'XLS 2.3L 4x2 AT',
    code: 'X00115',
    key: 'FORD_ESCAPE_XLS_2_3L_4X2_AT'
  },
  {
    name: 'Ford Escape XLT 3.0 AT',
    brand: 'FORD',
    model: 'Escape',
    version: 'XLT 3.0 AT',
    code: 'X00116',
    key: 'FORD_ESCAPE_XLT_3_0_AT'
  },
  {
    name: 'Ford Everest 2.5L 4x2 AT',
    brand: 'FORD',
    model: 'Everest',
    version: '2.5L 4x2 AT',
    code: 'X00117',
    key: 'FORD_EVEREST_2_5L_4X2_AT'
  },
  {
    name: 'Ford Everest 2.5L 4x2 MT',
    brand: 'FORD',
    model: 'Everest',
    version: '2.5L 4x2 MT',
    code: 'X00118',
    key: 'FORD_EVEREST_2_5L_4X2_MT'
  },
  {
    name: 'Ford Everest Ambiente 2.0 4x2 MT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Ambiente 2.0 4x2 MT',
    code: 'X00119',
    key: 'FORD_EVEREST_AMBIENTE_2_0_4X2_MT'
  },
  {
    name: 'Ford Everest Ambiente 2.0L 4x2 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Ambiente 2.0L 4x2 AT',
    code: 'X00120',
    key: 'FORD_EVEREST_AMBIENTE_2_0L_4X2_AT'
  },
  {
    name: 'Ford Everest Platinum 2.0L 4x4 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Platinum 2.0L 4x4 AT',
    code: 'X00121',
    key: 'FORD_EVEREST_PLATINUM_2_0L_4X4_AT'
  },
  {
    name: 'Ford Everest Sport 2.0L 4x2 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Sport 2.0L 4x2 AT',
    code: 'X00122',
    key: 'FORD_EVEREST_SPORT_2_0L_4X2_AT'
  },
  {
    name: 'Ford Everest Titanium 2.0L 4x2 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Titanium 2.0L 4x2 AT',
    code: 'X00123',
    key: 'FORD_EVEREST_TITANIUM_2_0L_4X2_AT'
  },
  {
    name: 'Ford Everest Titanium 2.0L 4x2 AT - 2024',
    brand: 'FORD',
    model: 'Everest',
    version: 'Titanium 2.0L 4x2 AT - 2024',
    code: 'X00124',
    key: 'FORD_EVEREST_TITANIUM_2_0L_4X2_AT_2024'
  },
  {
    name: 'Ford Everest Titanium 2.0L 4x4 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Titanium 2.0L 4x4 AT',
    code: 'X00125',
    key: 'FORD_EVEREST_TITANIUM_2_0L_4X4_AT'
  },
  {
    name: 'Ford Everest Titanium 2.2L 4x2 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Titanium 2.2L 4x2 AT',
    code: 'X00126',
    key: 'FORD_EVEREST_TITANIUM_2_2L_4X2_AT'
  },
  {
    name: 'Ford Everest Titanium 3.2L 4x4 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Titanium 3.2L 4x4 AT',
    code: 'X00127',
    key: 'FORD_EVEREST_TITANIUM_3_2L_4X4_AT'
  },
  {
    name: 'Ford Everest Titanium Plus 2.0L 4x4 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Titanium Plus 2.0L 4x4 AT',
    code: 'X00128',
    key: 'FORD_EVEREST_TITANIUM_PLUS_2_0L_4X4_AT'
  },
  {
    name: 'Ford Everest Trend 2.0L 4x2 AT',
    brand: 'FORD',
    model: 'Everest',
    version: 'Trend 2.0L 4x2 AT',
    code: 'X00129',
    key: 'FORD_EVEREST_TREND_2_0L_4X2_AT'
  },
  {
    name: 'Ford Explorer Limited 2.3L EcoBoost',
    brand: 'FORD',
    model: 'Explorer',
    version: 'Limited 2.3L EcoBoost',
    code: 'X00130',
    key: 'FORD_EXPLORER_LIMITED_2_3L_ECOBOOST'
  },
  {
    name: 'Ford Explorer Platinum 3.0L EcoBoost',
    brand: 'FORD',
    model: 'Explorer',
    version: 'Platinum 3.0L EcoBoost',
    code: 'X00131',
    key: 'FORD_EXPLORER_PLATINUM_3_0L_ECOBOOST'
  },
  {
    name: 'Ford F150 Harley Davidson',
    brand: 'FORD',
    model: 'F150',
    version: 'Harley Davidson',
    code: 'X00132',
    key: 'FORD_F150_HARLEY_DAVIDSON'
  },
  {
    name: 'Ford Fiesta 1.6 AT',
    brand: 'FORD',
    model: 'Fiesta',
    version: '1.6 AT',
    code: 'X00133',
    key: 'FORD_FIESTA_1_6_AT'
  },
  {
    name: 'Ford Fiesta S 1.0 AT Ecoboost',
    brand: 'FORD',
    model: 'Fiesta',
    version: 'S 1.0 AT Ecoboost',
    code: 'X00134',
    key: 'FORD_FIESTA_S_1_0_AT_ECOBOOST'
  },
  {
    name: 'Ford Fiesta S 1.0AT Ecoboost',
    brand: 'FORD',
    model: 'Fiesta',
    version: 'S 1.0AT Ecoboost',
    code: 'X00135',
    key: 'FORD_FIESTA_S_1_0AT_ECOBOOST'
  },
  {
    name: 'Ford Fiesta S 1.6 AT',
    brand: 'FORD',
    model: 'Fiesta',
    version: 'S 1.6 AT',
    code: 'X00136',
    key: 'FORD_FIESTA_S_1_6_AT'
  },
  {
    name: 'Ford Focus 1.8 AT',
    brand: 'FORD',
    model: 'Focus',
    version: '1.8 AT',
    code: 'X00137',
    key: 'FORD_FOCUS_1_8_AT'
  },
  {
    name: 'Ford Focus 1.8 AT - 2010',
    brand: 'FORD',
    model: 'Focus',
    version: '1.8 AT - 2010',
    code: 'X00138',
    key: 'FORD_FOCUS_1_8_AT_2010'
  },
  {
    name: 'Ford Focus 1.8 MT',
    brand: 'FORD',
    model: 'Focus',
    version: '1.8 MT',
    code: 'X00139',
    key: 'FORD_FOCUS_1_8_MT'
  },
  {
    name: 'Ford Focus S 2.0 AT',
    brand: 'FORD',
    model: 'Focus',
    version: 'S 2.0 AT',
    code: 'X00140',
    key: 'FORD_FOCUS_S_2_0_AT'
  },
  {
    name: 'Ford Focus Sport 1.5L',
    brand: 'FORD',
    model: 'Focus',
    version: 'Sport 1.5L',
    code: 'X00141',
    key: 'FORD_FOCUS_SPORT_1_5L'
  },
  {
    name: 'Ford Focus Trend 1.5L',
    brand: 'FORD',
    model: 'Focus',
    version: 'Trend 1.5L',
    code: 'X00142',
    key: 'FORD_FOCUS_TREND_1_5L'
  },
  {
    name: 'Ford Laser Deluxe 1.6 MT',
    brand: 'FORD',
    model: 'Laser',
    version: 'Deluxe 1.6 MT',
    code: 'X00143',
    key: 'FORD_LASER_DELUXE_1_6_MT'
  },
  {
    name: 'Ford Laser GHIA 1.8 MT',
    brand: 'FORD',
    model: 'Laser',
    version: 'GHIA 1.8 MT',
    code: 'X00144',
    key: 'FORD_LASER_GHIA_1_8_MT'
  },
  {
    name: 'Ford Laser LXi 1.6 MT',
    brand: 'FORD',
    model: 'Laser',
    version: 'LXi 1.6 MT',
    code: 'X00145',
    key: 'FORD_LASER_LXI_1_6_MT'
  },
  {
    name: 'Ford Mondeo 2.5 AT',
    brand: 'FORD',
    model: 'Mondeo',
    version: '2.5 AT',
    code: 'X00146',
    key: 'FORD_MONDEO_2_5_AT'
  },
  {
    name: 'Ford Mustang 2.3 EcoBoost Premium Fastback',
    brand: 'FORD',
    model: 'Mustang',
    version: '2.3 EcoBoost Premium Fastback',
    code: 'X00147',
    key: 'FORD_MUSTANG_2_3_ECOBOOST_PREMIUM_FASTBACK'
  },
  {
    name: 'Ford Ranger Raptor 2.0L 4x4 AT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'Raptor 2.0L 4x4 AT',
    code: 'X00148',
    key: 'FORD_RANGER_RAPTOR_2_0L_4X4_AT'
  },
  {
    name: 'Ford Ranger Raptor 2.0L 4x4 AT',
    brand: 'FORD',
    code: 'X00971',
    key: 'FORD_RANGER_RAPTOR_2_0L_4X4_AT'
  },
  {
    name: 'Ford Ranger Sport 2.0L 4x4 AT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'Sport 2.0L 4x4 AT',
    code: 'X00149',
    key: 'FORD_RANGER_SPORT_2_0L_4X4_AT'
  },
  {
    name: 'Ford Ranger Stormtrak 2.0L 4x4 AT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'Stormtrak 2.0L 4x4 AT',
    code: 'X00150',
    key: 'FORD_RANGER_STORMTRAK_2_0L_4X4_AT'
  },
  {
    name: 'Ford Ranger Stormtrak 2.0L 4x4 AT 2024',
    brand: 'FORD',
    model: 'Ranger',
    version: 'Stormtrak 2.0L 4x4 AT 2024',
    code: 'X00151',
    key: 'FORD_RANGER_STORMTRAK_2_0L_4X4_AT_2024'
  },
  {
    name: 'Ford Ranger Wildtrak',
    brand: 'FORD',
    model: 'Ranger',
    version: 'Wildtrak',
    code: 'X00152',
    key: 'FORD_RANGER_WILDTRAK'
  },
  {
    name: 'Ford Ranger Wildtrak 2.0L 4x4 AT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'Wildtrak 2.0L 4x4 AT',
    code: 'X00153',
    key: 'FORD_RANGER_WILDTRAK_2_0L_4X4_AT'
  },
  {
    name: 'Ford Ranger Wildtrak 2.5L 4x4 MT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'Wildtrak 2.5L 4x4 MT',
    code: 'X00154',
    key: 'FORD_RANGER_WILDTRAK_2_5L_4X4_MT'
  },
  {
    name: 'Ford Ranger Wildtrak 3.2L 4x4 AT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'Wildtrak 3.2L 4x4 AT',
    code: 'X00155',
    key: 'FORD_RANGER_WILDTRAK_3_2L_4X4_AT'
  },
  {
    name: 'Ford Ranger XL 2.2L 4x4 MT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XL 2.2L 4x4 MT',
    code: 'X00156',
    key: 'FORD_RANGER_XL_2_2L_4X4_MT'
  },
  {
    name: 'Ford Ranger XLS 2.0L 4x2 AT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XLS 2.0L 4x2 AT',
    code: 'X00157',
    key: 'FORD_RANGER_XLS_2_0L_4X2_AT'
  },
  {
    name: 'Ford Ranger XLS 2.0L 4x2 AT 2024',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XLS 2.0L 4x2 AT 2024',
    code: 'X00158',
    key: 'FORD_RANGER_XLS_2_0L_4X2_AT_2024'
  },
  {
    name: 'Ford Ranger XLS 2.0L 4x4 AT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XLS 2.0L 4x4 AT',
    code: 'X00159',
    key: 'FORD_RANGER_XLS_2_0L_4X4_AT'
  },
  {
    name: 'Ford Ranger XLS 2.2L 4x2 AT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XLS 2.2L 4x2 AT',
    code: 'X00160',
    key: 'FORD_RANGER_XLS_2_2L_4X2_AT'
  },
  {
    name: 'Ford Ranger XLS 2.2L 4x2 MT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XLS 2.2L 4x2 MT',
    code: 'X00161',
    key: 'FORD_RANGER_XLS_2_2L_4X2_MT'
  },
  {
    name: 'Ford Ranger XLT 2.2L 4x4 MT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XLT 2.2L 4x4 MT',
    code: 'X00162',
    key: 'FORD_RANGER_XLT_2_2L_4X4_MT'
  },
  {
    name: 'Ford Ranger XLT 2.5L 4x4 MT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XLT 2.5L 4x4 MT',
    code: 'X00163',
    key: 'FORD_RANGER_XLT_2_5L_4X4_MT'
  },
  {
    name: 'Ford Ranger XLT 4x4 MT',
    brand: 'FORD',
    model: 'Ranger',
    version: 'XLT 4x4 MT',
    code: 'X00164',
    key: 'FORD_RANGER_XLT_4X4_MT'
  },
  {
    name: 'Ford Territory Titanium',
    brand: 'FORD',
    model: 'Territory',
    version: 'Titanium',
    code: 'X00165',
    key: 'FORD_TERRITORY_TITANIUM'
  },
  {
    name: 'Ford Territory Titanium 1.5 AT',
    brand: 'FORD',
    model: 'Territory',
    version: 'Titanium 1.5 AT',
    code: 'X00166',
    key: 'FORD_TERRITORY_TITANIUM_1_5_AT'
  },
  {
    name: 'Ford Territory Titanium X 1.5 AT',
    brand: 'FORD',
    model: 'Territory',
    version: 'Titanium X 1.5 AT',
    code: 'X00167',
    key: 'FORD_TERRITORY_TITANIUM_X_1_5_AT'
  },
  {
    name: 'Ford Territory Trend 1.5 AT',
    brand: 'FORD',
    model: 'Territory',
    version: 'Trend 1.5 AT',
    code: 'X00168',
    key: 'FORD_TERRITORY_TREND_1_5_AT'
  },
  {
    name: 'Ford Tourneo Limousine 2.0 AT',
    brand: 'FORD',
    model: 'Tourneo',
    version: 'Limousine 2.0 AT',
    code: 'X00169',
    key: 'FORD_TOURNEO_LIMOUSINE_2_0_AT'
  },
  {
    name: 'Ford Tourneo Titanium 2.0 AT',
    brand: 'FORD',
    model: 'Tourneo',
    version: 'Titanium 2.0 AT',
    code: 'X00170',
    key: 'FORD_TOURNEO_TITANIUM_2_0_AT'
  },
  {
    name: 'Ford Transit Cứu thương',
    brand: 'FORD',
    model: 'Transit',
    version: 'Cứu thương',
    code: 'X00171',
    key: 'FORD_TRANSIT_CUU_THUONG'
  },
  {
    name: 'Ford Transit Limousine',
    brand: 'FORD',
    model: 'Transit',
    version: 'Limousine',
    code: 'X00172',
    key: 'FORD_TRANSIT_LIMOUSINE'
  },
  {
    name: 'Ford Transit Luxury',
    brand: 'FORD',
    model: 'Transit',
    version: 'Luxury',
    code: 'X00173',
    key: 'FORD_TRANSIT_LUXURY'
  },
  {
    name: 'Ford Transit Standard',
    brand: 'FORD',
    model: 'Transit',
    version: 'Standard',
    code: 'X00174',
    key: 'FORD_TRANSIT_STANDARD'
  },
  {
    name: 'Ford Transit Standard MID',
    brand: 'FORD',
    model: 'Transit',
    version: 'Standard MID',
    code: 'X00175',
    key: 'FORD_TRANSIT_STANDARD_MID'
  },
  {
    name: 'Ford Transit SVP',
    brand: 'FORD',
    model: 'Transit',
    version: 'SVP',
    code: 'X00176',
    key: 'FORD_TRANSIT_SVP'
  },
  {
    name: 'Ford Transit Tiêu chuẩn',
    brand: 'FORD',
    model: 'Transit',
    version: 'Tiêu chuẩn',
    code: 'X00177',
    key: 'FORD_TRANSIT_TIEU_CHUAN'
  },
  {
    name: 'Ford Transit Van',
    brand: 'FORD',
    model: 'Transit',
    version: 'Van',
    code: 'X00178',
    key: 'FORD_TRANSIT_VAN'
  },
  {
    name: 'Ford Transit Van 2.4L',
    brand: 'FORD',
    model: 'Transit',
    version: 'Van 2.4L',
    code: 'X00179',
    key: 'FORD_TRANSIT_VAN_2_4L'
  },
  {
    name: 'Ford Transit Van 800kg',
    brand: 'FORD',
    model: 'Transit',
    version: 'Van 800kg',
    code: 'X00180',
    key: 'FORD_TRANSIT_VAN_800KG'
  },
  {
    name: 'Ford Transit Van 940kg',
    brand: 'FORD',
    model: 'Transit',
    version: 'Van 940kg',
    code: 'X00181',
    key: 'FORD_TRANSIT_VAN_940KG'
  },
  {
    name: 'Gaz Gazelle',
    brand: 'GAZ',
    model: 'Gazelle',
    version: '#VALUE!',
    code: 'X00182',
    key: 'GAZ_GAZELLE'
  },
  {
    name: 'Haval H6 HEV',
    brand: 'HAVAL',
    model: 'H6',
    version: 'HEV',
    code: 'X00183',
    key: 'HAVAL_H6_HEV'
  },
  {
    name: 'Hino 700 Series Thùng dài cao 6.5T',
    brand: 'HINO',
    model: 700,
    version: 'Series Thùng dài cao 6.5T',
    code: 'X00184',
    key: 'HINO_700_SERIES_THUNG_DAI_CAO_6_5T'
  },
  {
    name: 'Hoa Mai',
    brand: 'HOA_MAI',
    version: '#VALUE!',
    code: 'X00185',
    key: 'HOA_MAI'
  },
  {
    name: 'Honda Accord 1.5 AT',
    brand: 'HONDA',
    model: 'Accord',
    version: '1.5 AT',
    code: 'X00186',
    key: 'HONDA_ACCORD_1_5_AT'
  },
  {
    name: 'Honda Accord 2.4 AT',
    brand: 'HONDA',
    model: 'Accord',
    version: '2.4 AT',
    code: 'X00187',
    key: 'HONDA_ACCORD_2_4_AT'
  },
  {
    name: 'Honda Accord 2.4 AT Coupe',
    brand: 'HONDA',
    model: 'Accord',
    version: '2.4 AT Coupe',
    code: 'X00188',
    key: 'HONDA_ACCORD_2_4_AT_COUPE'
  },
  {
    name: 'Honda BR V G',
    brand: 'HONDA',
    model: 'BR',
    version: 'V G',
    code: 'X00189',
    key: 'HONDA_BR_V_G'
  },
  {
    name: 'Honda BR V L',
    brand: 'HONDA',
    model: 'BR',
    version: 'V L',
    code: 'X00190',
    key: 'HONDA_BR_V_L'
  },
  {
    name: 'Honda Brio RS',
    brand: 'HONDA',
    model: 'Brio',
    version: 'RS',
    code: 'X00191',
    key: 'HONDA_BRIO_RS'
  },
  {
    name: 'Honda BRV L',
    brand: 'HONDA',
    model: 'BRV',
    version: 'L',
    code: 'X00192',
    key: 'HONDA_BRV_L'
  },
  {
    name: 'Honda City 1.5',
    brand: 'HONDA',
    model: 'City',
    version: 1.5,
    code: 'X00193',
    key: 'HONDA_CITY_1_5'
  },
  {
    name: 'Honda City 1.5 AT',
    brand: 'HONDA',
    model: 'City',
    version: '1.5 AT',
    code: 'X00194',
    key: 'HONDA_CITY_1_5_AT'
  },
  {
    name: 'Honda City 1.5TOP',
    brand: 'HONDA',
    model: 'City',
    version: '1.5TOP',
    code: 'X00195',
    key: 'HONDA_CITY_1_5TOP'
  },
  {
    name: 'Honda City G 1.5 AT',
    brand: 'HONDA',
    model: 'City',
    version: 'G 1.5 AT',
    code: 'X00196',
    key: 'HONDA_CITY_G_1_5_AT'
  },
  {
    name: 'Honda City L 1.5 AT',
    brand: 'HONDA',
    model: 'City',
    version: 'L 1.5 AT',
    code: 'X00197',
    key: 'HONDA_CITY_L_1_5_AT'
  },
  {
    name: 'Honda City RS 1.5 AT',
    brand: 'HONDA',
    model: 'City',
    version: 'RS 1.5 AT',
    code: 'X00198',
    key: 'HONDA_CITY_RS_1_5_AT'
  },
  {
    name: 'Honda Civic',
    brand: 'HONDA',
    code: 'X00963',
    key: 'HONDA_CIVIC'
  },
  {
    name: 'Honda Civic 1.5L Vtec Turbo',
    brand: 'HONDA',
    model: 'Civic',
    version: '1.5L Vtec Turbo',
    code: 'X00199',
    key: 'HONDA_CIVIC_1_5L_VTEC_TURBO'
  },
  {
    name: 'Honda Civic 1.8 MT',
    brand: 'HONDA',
    model: 'Civic',
    version: '1.8 MT',
    code: 'X00200',
    key: 'HONDA_CIVIC_1_8_MT'
  },
  {
    name: 'Honda Civic 2.0 AT',
    brand: 'HONDA',
    model: 'Civic',
    version: '2.0 AT',
    code: 'X00201',
    key: 'HONDA_CIVIC_2_0_AT'
  },
  {
    name: 'Honda Civic G 1.5 AT',
    brand: 'HONDA',
    model: 'Civic',
    version: 'G 1.5 AT',
    code: 'X00202',
    key: 'HONDA_CIVIC_G_1_5_AT'
  },
  {
    name: 'Honda Civic G 1.8 AT',
    brand: 'HONDA',
    model: 'Civic',
    version: 'G 1.8 AT',
    code: 'X00203',
    key: 'HONDA_CIVIC_G_1_8_AT'
  },
  {
    name: 'Honda Civic RS 1.5 AT',
    brand: 'HONDA',
    model: 'Civic',
    version: 'RS 1.5 AT',
    code: 'X00204',
    key: 'HONDA_CIVIC_RS_1_5_AT'
  },
  {
    name: 'Honda CRV 2.0 AT',
    brand: 'HONDA',
    model: 'CRV',
    version: '2.0 AT',
    code: 'X00205',
    key: 'HONDA_CRV_2_0_AT'
  },
  {
    name: 'Honda CRV 2.4 AT',
    brand: 'HONDA',
    model: 'CRV',
    version: '2.4 AT',
    code: 'X00206',
    key: 'HONDA_CRV_2_4_AT'
  },
  {
    name: 'Honda CRV 2.4 AT - TG',
    brand: 'HONDA',
    model: 'CRV',
    version: '2.4 AT - TG',
    code: 'X00207',
    key: 'HONDA_CRV_2_4_AT_TG'
  },
  {
    name: 'Honda CRV e HEV RS',
    brand: 'HONDA',
    model: 'CRV',
    version: 'e HEV RS',
    code: 'X00208',
    key: 'HONDA_CRV_E_HEV_RS'
  },
  {
    name: 'Honda CRV G',
    brand: 'HONDA',
    model: 'CRV',
    version: 'G',
    code: 'X00209',
    key: 'HONDA_CRV_G'
  },
  {
    name: 'Honda CRV L',
    brand: 'HONDA',
    model: 'CRV',
    version: 'L',
    code: 'X00210',
    key: 'HONDA_CRV_L'
  },
  {
    name: 'Honda CRV L AWD',
    brand: 'HONDA',
    model: 'CRV',
    version: 'L AWD',
    code: 'X00211',
    key: 'HONDA_CRV_L_AWD'
  },
  {
    name: 'Honda HRV G',
    brand: 'HONDA',
    model: 'HRV',
    version: 'G',
    code: 'X00212',
    key: 'HONDA_HRV_G'
  },
  {
    name: 'Honda HRV G 1.5 AT',
    brand: 'HONDA',
    model: 'HRV',
    version: 'G 1.5 AT',
    code: 'X00213',
    key: 'HONDA_HRV_G_1_5_AT'
  },
  {
    name: 'Honda HRV L',
    brand: 'HONDA',
    model: 'HRV',
    version: 'L',
    code: 'X00214',
    key: 'HONDA_HRV_L'
  },
  {
    name: 'Honda HRV RS',
    brand: 'HONDA',
    model: 'HRV',
    version: 'RS',
    code: 'X00215',
    key: 'HONDA_HRV_RS'
  },
  {
    name: 'Honda Odyssey 2.4 AT',
    brand: 'HONDA',
    model: 'Odyssey',
    version: '2.4 AT',
    code: 'X00216',
    key: 'HONDA_ODYSSEY_2_4_AT'
  },
  {
    name: 'Hyundai Accent 1.4 AT',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: '1.4 AT',
    code: 'X00217',
    key: 'HYUNDAI_ACCENT_1_4_AT'
  },
  {
    name: 'Hyundai Accent 1.4 AT Đặc Biệt',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: '1.4 AT Đặc Biệt',
    code: 'X00218',
    key: 'HYUNDAI_ACCENT_1_4_AT_DAC_BIET'
  },
  {
    name: 'Hyundai Accent 1.4 ATH',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: '1.4 ATH',
    code: 'X00219',
    key: 'HYUNDAI_ACCENT_1_4_ATH'
  },
  {
    name: 'Hyundai Accent 1.4 MT',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: '1.4 MT',
    code: 'X00220',
    key: 'HYUNDAI_ACCENT_1_4_MT'
  },
  {
    name: 'Hyundai Accent 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: '1.5 AT',
    code: 'X00223',
    key: 'HYUNDAI_ACCENT_1_5_AT'
  },
  {
    name: 'Hyundai Accent 1.5 MT',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: '1.5 MT',
    code: 'X00224',
    key: 'HYUNDAI_ACCENT_1_5_MT'
  },
  {
    name: 'Hyundai Accent Cao cấp',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: 'Cao cấp',
    code: 'X00225',
    key: 'HYUNDAI_ACCENT_CAO_CAP'
  },
  {
    name: 'Hyundai Accent Cao cấp 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: 'Cao cấp 1.5 AT',
    code: 'X00226',
    key: 'HYUNDAI_ACCENT_CAO_CAP_1_5_AT'
  },
  {
    name: 'Hyundai Accent Đặc biệt 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Accent',
    version: 'Đặc biệt 1.5 AT',
    code: 'X00227',
    key: 'HYUNDAI_ACCENT_DAC_BIET_1_5_AT'
  },
  {
    name: 'Hyundai Avante 1.6 MT',
    brand: 'HYUNDAI',
    code: 'X00946',
    key: 'HYUNDAI_AVANTE_1_6_MT'
  },
  {
    name: 'Hyundai County',
    brand: 'HYUNDAI',
    model: 'County',
    version: '#VALUE!',
    code: 'X00228',
    key: 'HYUNDAI_COUNTY'
  },
  {
    name: 'Hyundai Creta Cao cấp 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Creta',
    version: 'Cao cấp 1.5 AT',
    code: 'X00229',
    key: 'HYUNDAI_CRETA_CAO_CAP_1_5_AT'
  },
  {
    name: 'Hyundai Creta Đặc biệt 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Creta',
    version: 'Đặc biệt 1.5 AT',
    code: 'X00230',
    key: 'HYUNDAI_CRETA_DAC_BIET_1_5_AT'
  },
  {
    name: 'Hyundai Creta Tiêu chuẩn 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Creta',
    version: 'Tiêu chuẩn 1.5 AT',
    code: 'X00231',
    key: 'HYUNDAI_CRETA_TIEU_CHUAN_1_5_AT'
  },
  {
    name: 'Hyundai Custin Cao Cấp 2.0T',
    brand: 'HYUNDAI',
    model: 'Custin',
    version: 'Cao Cấp 2.0T',
    code: 'X00232',
    key: 'HYUNDAI_CUSTIN_CAO_CAP_2_0T'
  },
  {
    name: 'Hyundai Custin Đặc Biệt 1.5T',
    brand: 'HYUNDAI',
    model: 'Custin',
    version: 'Đặc Biệt 1.5T',
    code: 'X00233',
    key: 'HYUNDAI_CUSTIN_DAC_BIET_1_5T'
  },
  {
    name: 'Hyundai Custin Tiêu Chuẩn 1.5T',
    brand: 'HYUNDAI',
    model: 'Custin',
    version: 'Tiêu Chuẩn 1.5T',
    code: 'X00234',
    key: 'HYUNDAI_CUSTIN_TIEU_CHUAN_1_5T'
  },
  {
    name: 'Hyundai Elantra 1.6 AT',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: '1.6 AT',
    code: 'X00235',
    key: 'HYUNDAI_ELANTRA_1_6_AT'
  },
  {
    name: 'Hyundai Elantra 1.6 AT Đặc biệt',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: '1.6 AT Đặc biệt',
    code: 'X00236',
    key: 'HYUNDAI_ELANTRA_1_6_AT_DAC_BIET'
  },
  {
    name: 'Hyundai Elantra 1.6 AT Tiêu chuẩn',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: '1.6 AT Tiêu chuẩn',
    code: 'X00237',
    key: 'HYUNDAI_ELANTRA_1_6_AT_TIEU_CHUAN'
  },
  {
    name: 'Hyundai Elantra 1.6 MT',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: '1.6 MT',
    code: 'X00238',
    key: 'HYUNDAI_ELANTRA_1_6_MT'
  },
  {
    name: 'Hyundai Elantra 1.8 AT',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: '1.8 AT',
    code: 'X00239',
    key: 'HYUNDAI_ELANTRA_1_8_AT'
  },
  {
    name: 'Hyundai Elantra 2.0 AT',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: '2.0 AT',
    code: 'X00240',
    key: 'HYUNDAI_ELANTRA_2_0_AT'
  },
  {
    name: 'Hyundai Elantra 2.0 AT Cao cấp',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: '2.0 AT Cao cấp',
    code: 'X00241',
    key: 'HYUNDAI_ELANTRA_2_0_AT_CAO_CAP'
  },
  {
    name: 'Hyundai Elantra N-Line 1.6 Turbo AT',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: 'N-Line 1.6 Turbo AT',
    code: 'X00242',
    key: 'HYUNDAI_ELANTRA_N_LINE_1_6_TURBO_AT'
  },
  {
    name: 'Hyundai Elantra Sport 1.6 AT',
    brand: 'HYUNDAI',
    model: 'Elantra',
    version: 'Sport 1.6 AT',
    code: 'X00243',
    key: 'HYUNDAI_ELANTRA_SPORT_1_6_AT'
  },
  {
    name: 'Hyundai eMighty',
    brand: 'HYUNDAI',
    model: 'eMighty',
    version: '#VALUE!',
    code: 'X00244',
    key: 'HYUNDAI_EMIGHTY'
  },
  {
    name: 'Hyundai Genesis 2.0 AT',
    brand: 'HYUNDAI',
    model: 'Genesis',
    version: '2.0 AT',
    code: 'X00245',
    key: 'HYUNDAI_GENESIS_2_0_AT'
  },
  {
    name: 'Hyundai Getz 1.1 MT',
    brand: 'HYUNDAI',
    model: 'Getz',
    version: '1.1 MT',
    code: 'X00246',
    key: 'HYUNDAI_GETZ_1_1_MT'
  },
  {
    name: 'Hyundai Getz 1.4 AT',
    brand: 'HYUNDAI',
    code: 'X00955',
    key: 'HYUNDAI_GETZ_1_4_AT'
  },
  {
    name: 'Hyundai Grand Starex 2.4 AT',
    brand: 'HYUNDAI',
    model: 'Grand',
    version: 'Starex 2.4 AT',
    code: 'X00247',
    key: 'HYUNDAI_GRAND_STAREX_2_4_AT'
  },
  {
    name: 'Hyundai Grand Starex 2.4 MT',
    brand: 'HYUNDAI',
    model: 'Grand',
    version: 'Starex 2.4 MT',
    code: 'X00248',
    key: 'HYUNDAI_GRAND_STAREX_2_4_MT'
  },
  {
    name: 'Hyundai Grand Starex 2.5 MT',
    brand: 'HYUNDAI',
    model: 'Grand',
    version: 'Starex 2.5 MT',
    code: 'X00249',
    key: 'HYUNDAI_GRAND_STAREX_2_5_MT'
  },
  {
    name: 'Hyundai Grand Starex Van 2.4 MT',
    brand: 'HYUNDAI',
    model: 'Grand',
    version: 'Starex Van 2.4 MT',
    code: 'X00250',
    key: 'HYUNDAI_GRAND_STAREX_VAN_2_4_MT'
  },
  {
    name: 'Hyundai Grand Starex Van 2.5 MT',
    brand: 'HYUNDAI',
    model: 'Grand',
    version: 'Starex Van 2.5 MT',
    code: 'X00251',
    key: 'HYUNDAI_GRAND_STAREX_VAN_2_5_MT'
  },
  {
    name: 'Hyundai HD',
    brand: 'HYUNDAI',
    model: 'HD',
    version: '#VALUE!',
    code: 'X00252',
    key: 'HYUNDAI_HD'
  },
  {
    name: 'Hyundai HD 1000 Đầu kéo',
    brand: 'HYUNDAI',
    code: 'X00972',
    key: 'HYUNDAI_HD_1000_DAU_KEO'
  },
  {
    name: 'Hyundai i10 1.1 MT',
    brand: 'HYUNDAI',
    model: 'i10',
    version: '1.1 MT',
    code: 'X00253',
    key: 'HYUNDAI_I10_1_1_MT'
  },
  {
    name: 'Hyundai i10 1.2',
    brand: 'HYUNDAI',
    code: 'X00975',
    key: 'HYUNDAI_I10_1_2'
  },
  {
    name: 'Hyundai i10 1.2 AT',
    brand: 'HYUNDAI',
    model: 'i10',
    version: '1.2 AT',
    code: 'X00254',
    key: 'HYUNDAI_I10_1_2_AT'
  },
  {
    name: 'Hyundai i10 1.2 MT',
    brand: 'HYUNDAI',
    model: 'i10',
    version: '1.2 MT',
    code: 'X00255',
    key: 'HYUNDAI_I10_1_2_MT'
  },
  {
    name: 'Hyundai i10 1.2 MT Tiêu Chuẩn',
    brand: 'HYUNDAI',
    model: 'i10',
    version: '1.2 MT Tiêu Chuẩn',
    code: 'X00256',
    key: 'HYUNDAI_I10_1_2_MT_TIEU_CHUAN'
  },
  {
    name: 'Hyundai i10 Grand',
    brand: 'HYUNDAI',
    model: 'i10',
    version: 'Grand',
    code: 'X00257',
    key: 'HYUNDAI_I10_GRAND'
  },
  {
    name: 'Hyundai i10 Grand 1.0 AT',
    brand: 'HYUNDAI',
    model: 'i10',
    version: 'Grand 1.0 AT',
    code: 'X00258',
    key: 'HYUNDAI_I10_GRAND_1_0_AT'
  },
  {
    name: 'Hyundai i10 Grand 1.0 MT Base',
    brand: 'HYUNDAI',
    model: 'i10',
    version: 'Grand 1.0 MT Base',
    code: 'X00259',
    key: 'HYUNDAI_I10_GRAND_1_0_MT_BASE'
  },
  {
    name: 'Hyundai i10 Grand 1.2 AT',
    brand: 'HYUNDAI',
    model: 'i10',
    version: 'Grand 1.2 AT',
    code: 'X00260',
    key: 'HYUNDAI_I10_GRAND_1_2_AT'
  },
  {
    name: 'Hyundai i10 Grand 1.2 MT',
    brand: 'HYUNDAI',
    model: 'i10',
    version: 'Grand 1.2 MT',
    code: 'X00261',
    key: 'HYUNDAI_I10_GRAND_1_2_MT'
  },
  {
    name: 'Hyundai i10 Grand 1.2 MT Base',
    brand: 'HYUNDAI',
    model: 'i10',
    version: 'Grand 1.2 MT Base',
    code: 'X00262',
    key: 'HYUNDAI_I10_GRAND_1_2_MT_BASE'
  },
  {
    name: 'Hyundai i20 Active 1.4 AT',
    brand: 'HYUNDAI',
    model: 'i20',
    version: 'Active 1.4 AT',
    code: 'X00263',
    key: 'HYUNDAI_I20_ACTIVE_1_4_AT'
  },
  {
    name: 'Hyundai Ioniq 5 Prestige',
    brand: 'HYUNDAI',
    model: 'Ioniq',
    version: '5 Prestige',
    code: 'X00264',
    key: 'HYUNDAI_IONIQ_5_PRESTIGE'
  },
  {
    name: 'Hyundai Kona 1.6 Turbo',
    brand: 'HYUNDAI',
    model: 'Kona',
    version: '1.6 Turbo',
    code: 'X00265',
    key: 'HYUNDAI_KONA_1_6_TURBO'
  },
  {
    name: 'Hyundai Kona 2.0 AT',
    brand: 'HYUNDAI',
    model: 'Kona',
    version: '2.0 AT',
    code: 'X00266',
    key: 'HYUNDAI_KONA_2_0_AT'
  },
  {
    name: 'Hyundai Kona 2.0 ATH',
    brand: 'HYUNDAI',
    model: 'Kona',
    version: '2.0 ATH',
    code: 'X00267',
    key: 'HYUNDAI_KONA_2_0_ATH'
  },
  {
    name: 'Hyundai Kona Đặc biệt 2.0 AT',
    brand: 'HYUNDAI',
    model: 'Kona',
    version: 'Đặc biệt 2.0 AT',
    code: 'X00268',
    key: 'HYUNDAI_KONA_DAC_BIET_2_0_AT'
  },
  {
    name: 'Hyundai Libero 2.5',
    brand: 'HYUNDAI',
    model: 'Libero',
    version: 2.5,
    code: 'X00269',
    key: 'HYUNDAI_LIBERO_2_5'
  },
  {
    name: 'Hyundai Mighty',
    brand: 'HYUNDAI',
    model: 'Mighty',
    version: '#VALUE!',
    code: 'X00270',
    key: 'HYUNDAI_MIGHTY'
  },
  {
    name: 'Hyundai Mighty 1t65 thùng 4m',
    brand: 'HYUNDAI',
    model: 'Mighty',
    version: '1t65 thùng 4m',
    code: 'X00271',
    key: 'HYUNDAI_MIGHTY_1T65_THUNG_4M'
  },
  {
    name: 'Hyundai Mighty 75s',
    brand: 'HYUNDAI',
    model: 'Mighty',
    version: '75s',
    code: 'X00272',
    key: 'HYUNDAI_MIGHTY_75S'
  },
  {
    name: 'Hyundai Mighty 75s xe thùng inox',
    brand: 'HYUNDAI',
    model: 'Mighty',
    version: '75s xe thùng inox',
    code: 'X00273',
    key: 'HYUNDAI_MIGHTY_75S_XE_THUNG_INOX'
  },
  {
    name: 'Hyundai Mighty N250',
    brand: 'HYUNDAI',
    model: 'Mighty',
    version: 'N250',
    code: 'X00274',
    key: 'HYUNDAI_MIGHTY_N250'
  },
  {
    name: 'Hyundai Palisade Exclusive 2.2 AT',
    brand: 'HYUNDAI',
    model: 'Palisade',
    version: 'Exclusive 2.2 AT',
    code: 'X00275',
    key: 'HYUNDAI_PALISADE_EXCLUSIVE_2_2_AT'
  },
  {
    name: 'Hyundai Palisade Prestige 2.2 AT HTRAC',
    brand: 'HYUNDAI',
    model: 'Palisade',
    version: 'Prestige 2.2 AT HTRAC',
    code: 'X00276',
    key: 'HYUNDAI_PALISADE_PRESTIGE_2_2_AT_HTRAC'
  },
  {
    name: 'Hyundai Porter',
    brand: 'HYUNDAI',
    model: 'Porter',
    version: '#VALUE!',
    code: 'X00277',
    key: 'HYUNDAI_PORTER'
  },
  {
    name: 'Hyundai Porter Đông lạnh',
    brand: 'HYUNDAI',
    model: 'Porter',
    version: 'Đông lạnh',
    code: 'X00278',
    key: 'HYUNDAI_PORTER_DONG_LANH'
  },
  {
    name: 'Hyundai Porter H150',
    brand: 'HYUNDAI',
    model: 'Porter',
    version: 'H150',
    code: 'X00279',
    key: 'HYUNDAI_PORTER_H150'
  },
  {
    name: 'Hyundai SantaFe 2.2L',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: '2.2L',
    code: 'X00280',
    key: 'HYUNDAI_SANTAFE_2_2L'
  },
  {
    name: 'Hyundai SantaFe 2.2L 4WD',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: '2.2L 4WD',
    code: 'X00281',
    key: 'HYUNDAI_SANTAFE_2_2L_4WD'
  },
  {
    name: 'Hyundai SantaFe 2.2L HTRAC',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: '2.2L HTRAC',
    code: 'X00282',
    key: 'HYUNDAI_SANTAFE_2_2L_HTRAC'
  },
  {
    name: 'Hyundai SantaFe 2.4L',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: '2.4L',
    code: 'X00283',
    key: 'HYUNDAI_SANTAFE_2_4L'
  },
  {
    name: 'Hyundai SantaFe 2.4L 4WD',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: '2.4L 4WD',
    code: 'X00284',
    key: 'HYUNDAI_SANTAFE_2_4L_4WD'
  },
  {
    name: 'Hyundai SantaFe 2.4L AT',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: '2.4L AT',
    code: 'X00285',
    key: 'HYUNDAI_SANTAFE_2_4L_AT'
  },
  {
    name: 'Hyundai SantaFe 2.4L HTRAC',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: '2.4L HTRAC',
    code: 'X00286',
    key: 'HYUNDAI_SANTAFE_2_4L_HTRAC'
  },
  {
    name: 'Hyundai SantaFe 2.7 MT',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: '2.7 MT',
    code: 'X00287',
    key: 'HYUNDAI_SANTAFE_2_7_MT'
  },
  {
    name: 'Hyundai SantaFe Cao cấp 2.2L HTRAC',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Cao cấp 2.2L HTRAC',
    code: 'X00288',
    key: 'HYUNDAI_SANTAFE_CAO_CAP_2_2L_HTRAC'
  },
  {
    name: 'Hyundai SantaFe Cao cấp 2.2L HTRAC AT',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Cao cấp 2.2L HTRAC AT',
    code: 'X00289',
    key: 'HYUNDAI_SANTAFE_CAO_CAP_2_2L_HTRAC_AT'
  },
  {
    name: 'Hyundai SantaFe Cao cấp 2.5L HTRAC',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Cao cấp 2.5L HTRAC',
    code: 'X00290',
    key: 'HYUNDAI_SANTAFE_CAO_CAP_2_5L_HTRAC'
  },
  {
    name: 'Hyundai SantaFe Cao cấp 2.5L HTRAC 2022',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Cao cấp 2.5L HTRAC 2022',
    code: 'X00291',
    key: 'HYUNDAI_SANTAFE_CAO_CAP_2_5L_HTRAC_2022'
  },
  {
    name: 'Hyundai SantaFe Đặc biệt 2.5L HTRAC',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Đặc biệt 2.5L HTRAC',
    code: 'X00292',
    key: 'HYUNDAI_SANTAFE_DAC_BIET_2_5L_HTRAC'
  },
  {
    name: 'Hyundai SantaFe Premium 2.2L HTRAC',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Premium 2.2L HTRAC',
    code: 'X00293',
    key: 'HYUNDAI_SANTAFE_PREMIUM_2_2L_HTRAC'
  },
  {
    name: 'Hyundai SantaFe Premium 2.4L HTRAC',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Premium 2.4L HTRAC',
    code: 'X00294',
    key: 'HYUNDAI_SANTAFE_PREMIUM_2_4L_HTRAC'
  },
  {
    name: 'Hyundai SantaFe Tiêu chuẩn 2.2L',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Tiêu chuẩn 2.2L',
    code: 'X00295',
    key: 'HYUNDAI_SANTAFE_TIEU_CHUAN_2_2L'
  },
  {
    name: 'Hyundai SantaFe Tiêu chuẩn 2.5L',
    brand: 'HYUNDAI',
    model: 'SantaFe',
    version: 'Tiêu chuẩn 2.5L',
    code: 'X00296',
    key: 'HYUNDAI_SANTAFE_TIEU_CHUAN_2_5L'
  },
  {
    name: 'Hyundai Sonata 2.0 AT',
    brand: 'HYUNDAI',
    model: 'Sonata',
    version: '2.0 AT',
    code: 'X00297',
    key: 'HYUNDAI_SONATA_2_0_AT'
  },
  {
    name: 'Hyundai Starex Van 2.5 MT',
    brand: 'HYUNDAI',
    model: 'Starex',
    version: 'Van 2.5 MT',
    code: 'X00298',
    key: 'HYUNDAI_STAREX_VAN_2_5_MT'
  },
  {
    name: 'Hyundai Stargazer Cao cấp 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Stargazer',
    version: 'Cao cấp 1.5 AT',
    code: 'X00299',
    key: 'HYUNDAI_STARGAZER_CAO_CAP_1_5_AT'
  },
  {
    name: 'Hyundai Stargazer Đặc biệt 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Stargazer',
    version: 'Đặc biệt 1.5 AT',
    code: 'X00300',
    key: 'HYUNDAI_STARGAZER_DAC_BIET_1_5_AT'
  },
  {
    name: 'Hyundai Stargazer X 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Stargazer',
    version: 'X 1.5 AT',
    code: 'X00301',
    key: 'HYUNDAI_STARGAZER_X_1_5_AT'
  },
  {
    name: 'Hyundai Stargazer X Cao cấp 1.5 AT',
    brand: 'HYUNDAI',
    model: 'Stargazer',
    version: 'X Cao cấp 1.5 AT',
    code: 'X00302',
    key: 'HYUNDAI_STARGAZER_X_CAO_CAP_1_5_AT'
  },
  {
    name: 'Hyundai Tucson 1.6 AT Turbo',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '1.6 AT Turbo',
    code: 'X00303',
    key: 'HYUNDAI_TUCSON_1_6_AT_TURBO'
  },
  {
    name: 'Hyundai Tucson 1.6 AT Turbo Đặc biệt',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '1.6 AT Turbo Đặc biệt',
    code: 'X00304',
    key: 'HYUNDAI_TUCSON_1_6_AT_TURBO_DAC_BIET'
  },
  {
    name: 'Hyundai Tucson 1.6 AT Turbo HTRAC Đặc biệt',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '1.6 AT Turbo HTRAC Đặc biệt',
    code: 'X00305',
    key: 'HYUNDAI_TUCSON_1_6_AT_TURBO_HTRAC_DAC_BIET'
  },
  {
    name: 'Hyundai Tucson 2.0 AT',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '2.0 AT',
    code: 'X00306',
    key: 'HYUNDAI_TUCSON_2_0_AT'
  },
  {
    name: 'Hyundai Tucson 2.0 AT CRDi',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '2.0 AT CRDi',
    code: 'X00307',
    key: 'HYUNDAI_TUCSON_2_0_AT_CRDI'
  },
  {
    name: 'Hyundai Tucson 2.0 AT CRDi Đặc biệt',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '2.0 AT CRDi Đặc biệt',
    code: 'X00308',
    key: 'HYUNDAI_TUCSON_2_0_AT_CRDI_DAC_BIET'
  },
  {
    name: 'Hyundai Tucson 2.0 AT Đặc biệt',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '2.0 AT Đặc biệt',
    code: 'X00309',
    key: 'HYUNDAI_TUCSON_2_0_AT_DAC_BIET'
  },
  {
    name: 'Hyundai Tucson 2.0 AT Tiêu chuẩn',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '2.0 AT Tiêu chuẩn',
    code: 'X00310',
    key: 'HYUNDAI_TUCSON_2_0_AT_TIEU_CHUAN'
  },
  {
    name: 'Hyundai Tucson 2.0 ATH',
    brand: 'HYUNDAI',
    model: 'Tucson',
    version: '2.0 ATH',
    code: 'X00311',
    key: 'HYUNDAI_TUCSON_2_0_ATH'
  },
  {
    name: 'Hyundai Venue 1.0 T-GDi',
    brand: 'HYUNDAI',
    model: 'Venue',
    version: '1.0 T-GDi',
    code: 'X00312',
    key: 'HYUNDAI_VENUE_1_0_T_GDI'
  },
  {
    name: 'Hyundai Venue 1.0 T-GDi Đặc Biệt',
    brand: 'HYUNDAI',
    model: 'Venue',
    version: '1.0 T-GDi Đặc Biệt',
    code: 'X00313',
    key: 'HYUNDAI_VENUE_1_0_T_GDI_DAC_BIET'
  },
  {
    name: 'Hyundai Veracruz 3.0 V6',
    brand: 'HYUNDAI',
    model: 'Veracruz',
    version: '3.0 V6',
    code: 'X00314',
    key: 'HYUNDAI_VERACRUZ_3_0_V6'
  },
  {
    name: 'Hyundai Verna 1.4 MT',
    brand: 'HYUNDAI',
    model: 'Verna',
    version: '1.4 MT',
    code: 'X00315',
    key: 'HYUNDAI_VERNA_1_4_MT'
  },
  {
    name: 'Infiniti QX 60 3.5 AWD',
    brand: 'INFINITI',
    model: 'QX',
    version: '60 3.5 AWD',
    code: 'X00316',
    key: 'INFINITI_QX_60_3_5_AWD'
  },
  {
    name: 'Isuzu Dmax Hi Lander 1.9L 4x2 AT',
    brand: 'ISUZU',
    model: 'Dmax',
    version: 'Hi Lander 1.9L 4x2 AT',
    code: 'X00317',
    key: 'ISUZU_DMAX_HI_LANDER_1_9L_4X2_AT'
  },
  {
    name: 'Isuzu Dmax LS 1.9L 4x2 AT',
    brand: 'ISUZU',
    model: 'Dmax',
    version: 'LS 1.9L 4x2 AT',
    code: 'X00318',
    key: 'ISUZU_DMAX_LS_1_9L_4X2_AT'
  },
  {
    name: 'Isuzu Dmax LS 2.5 4x2 AT',
    brand: 'ISUZU',
    model: 'Dmax',
    version: 'LS 2.5 4x2 AT',
    code: 'X00319',
    key: 'ISUZU_DMAX_LS_2_5_4X2_AT'
  },
  {
    name: 'Isuzu Dmax LS 3.0 4x2 MT',
    brand: 'ISUZU',
    model: 'Dmax',
    version: 'LS 3.0 4x2 MT',
    code: 'X00320',
    key: 'ISUZU_DMAX_LS_3_0_4X2_MT'
  },
  {
    name: 'Isuzu Dmax LS Prestige 1.9L 4x2 AT',
    brand: 'ISUZU',
    model: 'Dmax',
    version: 'LS Prestige 1.9L 4x2 AT',
    code: 'X00321',
    key: 'ISUZU_DMAX_LS_PRESTIGE_1_9L_4X2_AT'
  },
  {
    name: 'Isuzu Dmax LS Prestige 3.0L 4x4 AT',
    brand: 'ISUZU',
    model: 'Dmax',
    version: 'LS Prestige 3.0L 4x4 AT',
    code: 'X00322',
    key: 'ISUZU_DMAX_LS_PRESTIGE_3_0L_4X4_AT'
  },
  {
    name: 'Isuzu Dmax Prestige 1.9L 4x2 AT',
    brand: 'ISUZU',
    model: 'Dmax',
    version: 'Prestige 1.9L 4x2 AT',
    code: 'X00323',
    key: 'ISUZU_DMAX_PRESTIGE_1_9L_4X2_AT'
  },
  {
    name: 'Isuzu FRR650',
    brand: 'ISUZU',
    model: 'FRR650',
    version: '#VALUE!',
    code: 'X00324',
    key: 'ISUZU_FRR650'
  },
  {
    name: 'Isuzu Hi lander V-spec 2.5 MT',
    brand: 'ISUZU',
    model: 'Hi',
    version: 'lander V-spec 2.5 MT',
    code: 'X00325',
    key: 'ISUZU_HI_LANDER_V_SPEC_2_5_MT'
  },
  {
    name: 'Isuzu MU-X 1.9 4X2 MT',
    brand: 'ISUZU',
    model: 'MU-X',
    version: '1.9 4X2 MT',
    code: 'X00326',
    key: 'ISUZU_MU_X_1_9_4X2_MT'
  },
  {
    name: 'Isuzu MU-X 2.5 4X2 MT',
    brand: 'ISUZU',
    model: 'MU-X',
    version: '2.5 4X2 MT',
    code: 'X00327',
    key: 'ISUZU_MU_X_2_5_4X2_MT'
  },
  {
    name: 'Isuzu MU-X B7 Plus 1.9 4X2 AT',
    brand: 'ISUZU',
    model: 'MU-X',
    version: 'B7 Plus 1.9 4X2 AT',
    code: 'X00328',
    key: 'ISUZU_MU_X_B7_PLUS_1_9_4X2_AT'
  },
  {
    name: 'Isuzu MU-X Premium 1.9 4X4 AT',
    brand: 'ISUZU',
    model: 'MU-X',
    version: 'Premium 1.9 4X4 AT',
    code: 'X00329',
    key: 'ISUZU_MU_X_PREMIUM_1_9_4X4_AT'
  },
  {
    name: 'Isuzu NMR 1.95T thùng Bạt',
    brand: 'ISUZU',
    model: 'NMR',
    version: '1.95T thùng Bạt',
    code: 'X00330',
    key: 'ISUZU_NMR_1_95T_THUNG_BAT'
  },
  {
    name: 'Isuzu Samco',
    brand: 'ISUZU',
    model: 'Samco',
    version: '#VALUE!',
    code: 'X00331',
    key: 'ISUZU_SAMCO'
  },
  {
    name: 'Jeep Gladiator Rubicon',
    brand: 'JEEP',
    model: 'Gladiator',
    version: 'Rubicon',
    code: 'X00332',
    key: 'JEEP_GLADIATOR_RUBICON'
  },
  {
    name: 'Jeep Khác',
    brand: 'JEEP',
    code: 'X00974',
    key: 'JEEP_KHAC'
  },
  {
    name: 'Jeep Wrangler Rubicon 2.0 4x4 AT',
    brand: 'JEEP',
    model: 'Wrangler',
    version: 'Rubicon 2.0 4x4 AT',
    code: 'X00333',
    key: 'JEEP_WRANGLER_RUBICON_2_0_4X4_AT'
  },
  {
    name: 'Jeep Wrangler Sahara Overland 2.0 4x4 AT',
    brand: 'JEEP',
    model: 'Wrangler',
    version: 'Sahara Overland 2.0 4x4 AT',
    code: 'X00334',
    key: 'JEEP_WRANGLER_SAHARA_OVERLAND_2_0_4X4_AT'
  },
  {
    name: 'Jeep Wrangler Sport 2.0 4x4 AT',
    brand: 'JEEP',
    model: 'Wrangler',
    version: 'Sport 2.0 4x4 AT',
    code: 'X00335',
    key: 'JEEP_WRANGLER_SPORT_2_0_4X4_AT'
  },
  {
    name: 'Kia Carens 1.4T Signature',
    brand: 'KIA',
    model: 'Carens',
    version: '1.4T Signature',
    code: 'X00336',
    key: 'KIA_CARENS_1_4T_SIGNATURE'
  },
  {
    name: 'Kia Carens 1.5D Signature',
    brand: 'KIA',
    model: 'Carens',
    version: '1.5D Signature',
    code: 'X00337',
    key: 'KIA_CARENS_1_5D_SIGNATURE'
  },
  {
    name: 'Kia Carens 1.5G IVT',
    brand: 'KIA',
    model: 'Carens',
    version: '1.5G IVT',
    code: 'X00338',
    key: 'KIA_CARENS_1_5G_IVT'
  },
  {
    name: 'Kia Carens 1.5G Luxury',
    brand: 'KIA',
    model: 'Carens',
    version: '1.5G Luxury',
    code: 'X00339',
    key: 'KIA_CARENS_1_5G_LUXURY'
  },
  {
    name: 'Kia Carens 1.5G MT Deluxe',
    brand: 'KIA',
    model: 'Carens',
    version: '1.5G MT Deluxe',
    code: 'X00340',
    key: 'KIA_CARENS_1_5G_MT_DELUXE'
  },
  {
    name: 'Kia Carens CRDi 2.0 AT',
    brand: 'KIA',
    model: 'Carens',
    version: 'CRDi 2.0 AT',
    code: 'X00341',
    key: 'KIA_CARENS_CRDI_2_0_AT'
  },
  {
    name: 'Kia Carens CRDi 2.0 MT',
    brand: 'KIA',
    model: 'Carens',
    version: 'CRDi 2.0 MT',
    code: 'X00342',
    key: 'KIA_CARENS_CRDI_2_0_MT'
  },
  {
    name: 'Kia Carens EX 2.0 MT',
    brand: 'KIA',
    model: 'Carens',
    version: 'EX 2.0 MT',
    code: 'X00343',
    key: 'KIA_CARENS_EX_2_0_MT'
  },
  {
    name: 'Kia Carens EXMT',
    brand: 'KIA',
    model: 'Carens',
    version: 'EXMT',
    code: 'X00344',
    key: 'KIA_CARENS_EXMT'
  },
  {
    name: 'Kia Carens SX 2.0 AT',
    brand: 'KIA',
    model: 'Carens',
    version: 'SX 2.0 AT',
    code: 'X00345',
    key: 'KIA_CARENS_SX_2_0_AT'
  },
  {
    name: 'Kia Carens SXAT',
    brand: 'KIA',
    code: 'X00947',
    key: 'KIA_CARENS_SXAT'
  },
  {
    name: 'Kia Carnival Luxury 2.2D',
    brand: 'KIA',
    model: 'Carnival',
    version: 'Luxury 2.2D',
    code: 'X00346',
    key: 'KIA_CARNIVAL_LUXURY_2_2D'
  },
  {
    name: 'Kia Carnival Premium 2.2D',
    brand: 'KIA',
    model: 'Carnival',
    version: 'Premium 2.2D',
    code: 'X00347',
    key: 'KIA_CARNIVAL_PREMIUM_2_2D'
  },
  {
    name: 'Kia Carnival Premium 2.2D 7S',
    brand: 'KIA',
    model: 'Carnival',
    version: 'Premium 2.2D 7S',
    code: 'X00348',
    key: 'KIA_CARNIVAL_PREMIUM_2_2D_7S'
  },
  {
    name: 'Kia Carnival Signature 2.2D',
    brand: 'KIA',
    model: 'Carnival',
    version: 'Signature 2.2D',
    code: 'X00349',
    key: 'KIA_CARNIVAL_SIGNATURE_2_2D'
  },
  {
    name: 'Kia Carnival Signature 3.5G',
    brand: 'KIA',
    model: 'Carnival',
    version: 'Signature 3.5G',
    code: 'X00350',
    key: 'KIA_CARNIVAL_SIGNATURE_3_5G'
  },
  {
    name: 'Kia Cerato 1.6 AT',
    brand: 'KIA',
    model: 'Cerato',
    version: '1.6 AT',
    code: 'X00351',
    key: 'KIA_CERATO_1_6_AT'
  },
  {
    name: 'Kia Cerato 1.6 AT Deluxe',
    brand: 'KIA',
    model: 'Cerato',
    version: '1.6 AT Deluxe',
    code: 'X00352',
    key: 'KIA_CERATO_1_6_AT_DELUXE'
  },
  {
    name: 'Kia Cerato 1.6 AT Luxury',
    brand: 'KIA',
    model: 'Cerato',
    version: '1.6 AT Luxury',
    code: 'X00353',
    key: 'KIA_CERATO_1_6_AT_LUXURY'
  },
  {
    name: 'Kia Cerato 1.6 MT',
    brand: 'KIA',
    model: 'Cerato',
    version: '1.6 MT',
    code: 'X00354',
    key: 'KIA_CERATO_1_6_MT'
  },
  {
    name: 'Kia Cerato 2.0 AT',
    brand: 'KIA',
    model: 'Cerato',
    version: '2.0 AT',
    code: 'X00355',
    key: 'KIA_CERATO_2_0_AT'
  },
  {
    name: 'Kia Cerato 2.0 AT Premium',
    brand: 'KIA',
    model: 'Cerato',
    version: '2.0 AT Premium',
    code: 'X00356',
    key: 'KIA_CERATO_2_0_AT_PREMIUM'
  },
  {
    name: 'Kia Forte GDI 1.6 AT',
    brand: 'KIA',
    code: 'X00949',
    key: 'KIA_FORTE_GDI_1_6_AT'
  },
  {
    name: 'Kia Forte SX 1.6 MT',
    brand: 'KIA',
    model: 'Forte',
    version: 'SX 1.6 MT',
    code: 'X00357',
    key: 'KIA_FORTE_SX_1_6_MT'
  },
  {
    name: 'Kia Frontier',
    brand: 'KIA',
    model: 'Frontier',
    version: '#VALUE!',
    code: 'X00358',
    key: 'KIA_FRONTIER'
  },
  {
    name: 'Kia Frontier K165',
    brand: 'KIA',
    model: 'Frontier',
    version: 'K165',
    code: 'X00359',
    key: 'KIA_FRONTIER_K165'
  },
  {
    name: 'Kia Frontier Thùng Mui Bạt',
    brand: 'KIA',
    model: 'Frontier',
    version: 'Thùng Mui Bạt',
    code: 'X00360',
    key: 'KIA_FRONTIER_THUNG_MUI_BAT'
  },
  {
    name: 'Kia K3 1.6 AT',
    brand: 'KIA',
    model: 'K3',
    version: '1.6 AT',
    code: 'X00361',
    key: 'KIA_K3_1_6_AT'
  },
  {
    name: 'Kia K3 1.6 MT',
    brand: 'KIA',
    model: 'K3',
    version: '1.6 MT',
    code: 'X00362',
    key: 'KIA_K3_1_6_MT'
  },
  {
    name: 'Kia K3 2.0 AT',
    brand: 'KIA',
    model: 'K3',
    version: '2.0 AT',
    code: 'X00363',
    key: 'KIA_K3_2_0_AT'
  },
  {
    name: 'Kia K3 Luxury 1.6 AT',
    brand: 'KIA',
    model: 'K3',
    version: 'Luxury 1.6 AT',
    code: 'X00364',
    key: 'KIA_K3_LUXURY_1_6_AT'
  },
  {
    name: 'Kia K3 Premium 1.6 AT',
    brand: 'KIA',
    model: 'K3',
    version: 'Premium 1.6 AT',
    code: 'X00365',
    key: 'KIA_K3_PREMIUM_1_6_AT'
  },
  {
    name: 'Kia K3 Premium 2.0 AT',
    brand: 'KIA',
    model: 'K3',
    version: 'Premium 2.0 AT',
    code: 'X00366',
    key: 'KIA_K3_PREMIUM_2_0_AT'
  },
  {
    name: 'Kia K3000S',
    brand: 'KIA',
    model: 'K3000S',
    version: '#VALUE!',
    code: 'X00367',
    key: 'KIA_K3000S'
  },
  {
    name: 'Kia K5 GT-Line 2.5 AT',
    brand: 'KIA',
    model: 'K5',
    version: 'GT-Line 2.5 AT',
    code: 'X00368',
    key: 'KIA_K5_GT_LINE_2_5_AT'
  },
  {
    name: 'Kia K5 Luxury 2.0 AT',
    brand: 'KIA',
    model: 'K5',
    version: 'Luxury 2.0 AT',
    code: 'X00369',
    key: 'KIA_K5_LUXURY_2_0_AT'
  },
  {
    name: 'Kia K5 Premium 2.0 AT',
    brand: 'KIA',
    code: 'X00948',
    key: 'KIA_K5_PREMIUM_2_0_AT'
  },
  {
    name: 'Kia Morning 1.0 AT',
    brand: 'KIA',
    code: 'X00970',
    key: 'KIA_MORNING_1_0_AT'
  },
  {
    name: 'Kia Morning 1.0 MT',
    brand: 'KIA',
    model: 'Morning',
    version: '1.0 MT',
    code: 'X00370',
    key: 'KIA_MORNING_1_0_MT'
  },
  {
    name: 'Kia Morning 1.25 MT',
    brand: 'KIA',
    model: 'Morning',
    version: '1.25 MT',
    code: 'X00371',
    key: 'KIA_MORNING_1_25_MT'
  },
  {
    name: 'Kia Morning AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'AT',
    code: 'X00372',
    key: 'KIA_MORNING_AT'
  },
  {
    name: 'Kia Morning Deluxe',
    brand: 'KIA',
    model: 'Morning',
    version: 'Deluxe',
    code: 'X00373',
    key: 'KIA_MORNING_DELUXE'
  },
  {
    name: 'Kia Morning EX',
    brand: 'KIA',
    model: 'Morning',
    version: 'EX',
    code: 'X00374',
    key: 'KIA_MORNING_EX'
  },
  {
    name: 'Kia Morning EX MTH',
    brand: 'KIA',
    model: 'Morning',
    version: 'EX MTH',
    code: 'X00375',
    key: 'KIA_MORNING_EX_MTH'
  },
  {
    name: 'Kia Morning GT-Line',
    brand: 'KIA',
    model: 'Morning',
    version: 'GT-Line',
    code: 'X00376',
    key: 'KIA_MORNING_GT_LINE'
  },
  {
    name: 'Kia Morning Luxury',
    brand: 'KIA',
    model: 'Morning',
    version: 'Luxury',
    code: 'X00377',
    key: 'KIA_MORNING_LUXURY'
  },
  {
    name: 'Kia Morning LX 1.0 AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'LX 1.0 AT',
    code: 'X00378',
    key: 'KIA_MORNING_LX_1_0_AT'
  },
  {
    name: 'Kia Morning LX 1.1 MT',
    brand: 'KIA',
    model: 'Morning',
    version: 'LX 1.1 MT',
    code: 'X00379',
    key: 'KIA_MORNING_LX_1_1_MT'
  },
  {
    name: 'Kia Morning MT',
    brand: 'KIA',
    model: 'Morning',
    version: 'MT',
    code: 'X00380',
    key: 'KIA_MORNING_MT'
  },
  {
    name: 'Kia Morning Premium AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'Premium AT',
    code: 'X00381',
    key: 'KIA_MORNING_PREMIUM_AT'
  },
  {
    name: 'Kia Morning S AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'S AT',
    code: 'X00382',
    key: 'KIA_MORNING_S_AT'
  },
  {
    name: 'Kia Morning Si 1.25 AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'Si 1.25 AT',
    code: 'X00383',
    key: 'KIA_MORNING_SI_1_25_AT'
  },
  {
    name: 'Kia Morning Si AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'Si AT',
    code: 'X00384',
    key: 'KIA_MORNING_SI_AT'
  },
  {
    name: 'Kia Morning SLX 1.0 AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'SLX 1.0 AT',
    code: 'X00385',
    key: 'KIA_MORNING_SLX_1_0_AT'
  },
  {
    name: 'Kia Morning SX 1.1 AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'SX 1.1 AT',
    code: 'X00386',
    key: 'KIA_MORNING_SX_1_1_AT'
  },
  {
    name: 'Kia Morning SX 1.1 AT Sport',
    brand: 'KIA',
    model: 'Morning',
    version: 'SX 1.1 AT Sport',
    code: 'X00387',
    key: 'KIA_MORNING_SX_1_1_AT_SPORT'
  },
  {
    name: 'Kia Morning Van 1.0 AT',
    brand: 'KIA',
    model: 'Morning',
    version: 'Van 1.0 AT',
    code: 'X00388',
    key: 'KIA_MORNING_VAN_1_0_AT'
  },
  {
    name: 'Kia Morning X-Line',
    brand: 'KIA',
    model: 'Morning',
    version: 'X-Line',
    code: 'X00389',
    key: 'KIA_MORNING_X_LINE'
  },
  {
    name: 'Kia Optima 2.0 AT',
    brand: 'KIA',
    model: 'Optima',
    version: '2.0 AT',
    code: 'X00390',
    key: 'KIA_OPTIMA_2_0_AT'
  },
  {
    name: 'Kia Optima 2.0 ATH',
    brand: 'KIA',
    code: 'X00956',
    key: 'KIA_OPTIMA_2_0_ATH'
  },
  {
    name: 'Kia Rio',
    brand: 'KIA',
    model: 'Rio',
    version: '#VALUE!',
    code: 'X00391',
    key: 'KIA_RIO'
  },
  {
    name: 'Kia Rio 1.4 AT',
    brand: 'KIA',
    model: 'Rio',
    version: '1.4 AT',
    code: 'X00392',
    key: 'KIA_RIO_1_4_AT'
  },
  {
    name: 'Kia Rondo GAT',
    brand: 'KIA',
    model: 'Rondo',
    version: 'GAT',
    code: 'X00393',
    key: 'KIA_RONDO_GAT'
  },
  {
    name: 'Kia Rondo GAT Deluxe',
    brand: 'KIA',
    model: 'Rondo',
    version: 'GAT Deluxe',
    code: 'X00394',
    key: 'KIA_RONDO_GAT_DELUXE'
  },
  {
    name: 'Kia Rondo GMT',
    brand: 'KIA',
    model: 'Rondo',
    version: 'GMT',
    code: 'X00395',
    key: 'KIA_RONDO_GMT'
  },
  {
    name: 'Kia Sedona 2.2 DAT Luxury',
    brand: 'KIA',
    model: 'Sedona',
    version: '2.2 DAT Luxury',
    code: 'X00396',
    key: 'KIA_SEDONA_2_2_DAT_LUXURY'
  },
  {
    name: 'Kia Sedona 2.2L DATH',
    brand: 'KIA',
    model: 'Sedona',
    version: '2.2L DATH',
    code: 'X00397',
    key: 'KIA_SEDONA_2_2L_DATH'
  },
  {
    name: 'Kia Sedona 3.3 GAT Premium',
    brand: 'KIA',
    model: 'Sedona',
    version: '3.3 GAT Premium',
    code: 'X00398',
    key: 'KIA_SEDONA_3_3_GAT_PREMIUM'
  },
  {
    name: 'Kia Sedona 3.3L GAT',
    brand: 'KIA',
    model: 'Sedona',
    version: '3.3L GAT',
    code: 'X00399',
    key: 'KIA_SEDONA_3_3L_GAT'
  },
  {
    name: 'Kia Sedona 3.3L GATH',
    brand: 'KIA',
    model: 'Sedona',
    version: '3.3L GATH',
    code: 'X00400',
    key: 'KIA_SEDONA_3_3L_GATH'
  },
  {
    name: 'Kia Seltos Deluxe 1.4 AT',
    brand: 'KIA',
    model: 'Seltos',
    version: 'Deluxe 1.4 AT',
    code: 'X00401',
    key: 'KIA_SELTOS_DELUXE_1_4_AT'
  },
  {
    name: 'Kia Seltos GT-Line 1.4 AT',
    brand: 'KIA',
    model: 'Seltos',
    version: 'GT-Line 1.4 AT',
    code: 'X00402',
    key: 'KIA_SELTOS_GT_LINE_1_4_AT'
  },
  {
    name: 'Kia Seltos Luxury 1.4 AT',
    brand: 'KIA',
    model: 'Seltos',
    version: 'Luxury 1.4 AT',
    code: 'X00403',
    key: 'KIA_SELTOS_LUXURY_1_4_AT'
  },
  {
    name: 'Kia Seltos Luxury 1.5 AT',
    brand: 'KIA',
    model: 'Seltos',
    version: 'Luxury 1.5 AT',
    code: 'X00404',
    key: 'KIA_SELTOS_LUXURY_1_5_AT'
  },
  {
    name: 'Kia Seltos Premium 1.4 AT',
    brand: 'KIA',
    model: 'Seltos',
    version: 'Premium 1.4 AT',
    code: 'X00405',
    key: 'KIA_SELTOS_PREMIUM_1_4_AT'
  },
  {
    name: 'Kia Seltos Premium 1.5 AT',
    brand: 'KIA',
    code: 'X00957',
    key: 'KIA_SELTOS_PREMIUM_1_5_AT'
  },
  {
    name: 'Kia Seltos Premium 1.6 AT',
    brand: 'KIA',
    model: 'Seltos',
    version: 'Premium 1.6 AT',
    code: 'X00406',
    key: 'KIA_SELTOS_PREMIUM_1_6_AT'
  },
  {
    name: 'Kia Soluto 1.4 AT Deluxe',
    brand: 'KIA',
    model: 'Soluto',
    version: '1.4 AT Deluxe',
    code: 'X00407',
    key: 'KIA_SOLUTO_1_4_AT_DELUXE'
  },
  {
    name: 'Kia Soluto 1.4 MT',
    brand: 'KIA',
    model: 'Soluto',
    version: '1.4 MT',
    code: 'X00408',
    key: 'KIA_SOLUTO_1_4_MT'
  },
  {
    name: 'Kia Soluto 1.4 MT Deluxe',
    brand: 'KIA',
    model: 'Soluto',
    version: '1.4 MT Deluxe',
    code: 'X00409',
    key: 'KIA_SOLUTO_1_4_MT_DELUXE'
  },
  {
    name: 'Kia Sonet Deluxe 1.5 AT',
    brand: 'KIA',
    model: 'Sonet',
    version: 'Deluxe 1.5 AT',
    code: 'X00410',
    key: 'KIA_SONET_DELUXE_1_5_AT'
  },
  {
    name: 'Kia Sonet Deluxe 1.5 MT',
    brand: 'KIA',
    model: 'Sonet',
    version: 'Deluxe 1.5 MT',
    code: 'X00411',
    key: 'KIA_SONET_DELUXE_1_5_MT'
  },
  {
    name: 'Kia Sonet Luxury 1.5 AT',
    brand: 'KIA',
    model: 'Sonet',
    version: 'Luxury 1.5 AT',
    code: 'X00412',
    key: 'KIA_SONET_LUXURY_1_5_AT'
  },
  {
    name: 'Kia Sonet Premium 1.5 AT',
    brand: 'KIA',
    model: 'Sonet',
    version: 'Premium 1.5 AT',
    code: 'X00413',
    key: 'KIA_SONET_PREMIUM_1_5_AT'
  },
  {
    name: 'Kia Sorento 2.2 DAT Premium',
    brand: 'KIA',
    model: 'Sorento',
    version: '2.2 DAT Premium',
    code: 'X00414',
    key: 'KIA_SORENTO_2_2_DAT_PREMIUM'
  },
  {
    name: 'Kia Sorento 2.4 GAT Deluxe',
    brand: 'KIA',
    model: 'Sorento',
    version: '2.4 GAT Deluxe',
    code: 'X00415',
    key: 'KIA_SORENTO_2_4_GAT_DELUXE'
  },
  {
    name: 'Kia Sorento DATH',
    brand: 'KIA',
    model: 'Sorento',
    version: 'DATH',
    code: 'X00416',
    key: 'KIA_SORENTO_DATH'
  },
  {
    name: 'Kia Sorento GAT',
    brand: 'KIA',
    model: 'Sorento',
    version: 'GAT',
    code: 'X00417',
    key: 'KIA_SORENTO_GAT'
  },
  {
    name: 'Kia Sorento GATH',
    brand: 'KIA',
    model: 'Sorento',
    version: 'GATH',
    code: 'X00418',
    key: 'KIA_SORENTO_GATH'
  },
  {
    name: 'Kia Sorento GATH 2.4L 2WD',
    brand: 'KIA',
    model: 'Sorento',
    version: 'GATH 2.4L 2WD',
    code: 'X00419',
    key: 'KIA_SORENTO_GATH_2_4L_2WD'
  },
  {
    name: 'Kia Sorento Luxury 2.2 AT',
    brand: 'KIA',
    model: 'Sorento',
    version: 'Luxury 2.2 AT',
    code: 'X00420',
    key: 'KIA_SORENTO_LUXURY_2_2_AT'
  },
  {
    name: 'Kia Sorento Premium 2.2 AT AWD',
    brand: 'KIA',
    model: 'Sorento',
    version: 'Premium 2.2 AT AWD',
    code: 'X00421',
    key: 'KIA_SORENTO_PREMIUM_2_2_AT_AWD'
  },
  {
    name: 'Kia Sorento Premium 2.5 AT',
    brand: 'KIA',
    model: 'Sorento',
    version: 'Premium 2.5 AT',
    code: 'X00422',
    key: 'KIA_SORENTO_PREMIUM_2_5_AT'
  },
  {
    name: 'Kia Sorento Signature 2.2 AT AWD',
    brand: 'KIA',
    model: 'Sorento',
    version: 'Signature 2.2 AT AWD',
    code: 'X00423',
    key: 'KIA_SORENTO_SIGNATURE_2_2_AT_AWD'
  },
  {
    name: 'Kia Sorento Signature 2.5 AT AWD',
    brand: 'KIA',
    model: 'Sorento',
    version: 'Signature 2.5 AT AWD',
    code: 'X00424',
    key: 'KIA_SORENTO_SIGNATURE_2_5_AT_AWD'
  },
  {
    name: 'Kia Spectra 1.6 AT',
    brand: 'KIA',
    model: 'Spectra',
    version: '1.6 AT',
    code: 'X00425',
    key: 'KIA_SPECTRA_1_6_AT'
  },
  {
    name: 'Kia Sportage GT Line',
    brand: 'KIA',
    model: 'Sportage',
    version: 'GT Line',
    code: 'X00426',
    key: 'KIA_SPORTAGE_GT_LINE'
  },
  {
    name: 'Kia Sportage Luxury 2.0G',
    brand: 'KIA',
    model: 'Sportage',
    version: 'Luxury 2.0G',
    code: 'X00427',
    key: 'KIA_SPORTAGE_LUXURY_2_0G'
  },
  {
    name: 'Kia Sportage Signature 1.6T AWD',
    brand: 'KIA',
    model: 'Sportage',
    version: 'Signature 1.6T AWD',
    code: 'X00428',
    key: 'KIA_SPORTAGE_SIGNATURE_1_6T_AWD'
  },
  {
    name: 'Kia Sportage Signature 2.0D',
    brand: 'KIA',
    model: 'Sportage',
    version: 'Signature 2.0D',
    code: 'X00429',
    key: 'KIA_SPORTAGE_SIGNATURE_2_0D'
  },
  {
    name: 'Kia Sportage Signature X-Line 1.6T AWD',
    brand: 'KIA',
    model: 'Sportage',
    version: 'Signature X-Line 1.6T AWD',
    code: 'X00430',
    key: 'KIA_SPORTAGE_SIGNATURE_X_LINE_1_6T_AWD'
  },
  {
    name: 'Lamborghini Aventador LP 700-4',
    brand: 'LAMBORGHINI',
    model: 'Aventador',
    version: 'LP 700-4',
    code: 'X00431',
    key: 'LAMBORGHINI_AVENTADOR_LP_700_4'
  },
  {
    name: 'Lamborghini Urus 4.0 V8',
    brand: 'LAMBORGHINI',
    model: 'Urus',
    version: '4.0 V8',
    code: 'X00432',
    key: 'LAMBORGHINI_URUS_4_0_V8'
  },
  {
    name: 'LandRover Defender 110 First Edition P400 3.0 AT',
    brand: 'LANDROVER',
    model: 'Defender',
    version: '110 First Edition P400 3.0 AT',
    code: 'X00433',
    key: 'LANDROVER_DEFENDER_110_FIRST_EDITION_P400_3_0_AT'
  },
  {
    name: 'LandRover Defender 110 HSE P300 2.0 AT',
    brand: 'LANDROVER',
    model: 'Defender',
    version: '110 HSE P300 2.0 AT',
    code: 'X00434',
    key: 'LANDROVER_DEFENDER_110_HSE_P300_2_0_AT'
  },
  {
    name: 'LandRover Discovery Sport HSE Luxury',
    brand: 'LANDROVER',
    model: 'Discovery',
    version: 'Sport HSE Luxury',
    code: 'X00435',
    key: 'LANDROVER_DISCOVERY_SPORT_HSE_LUXURY'
  },
  {
    name: 'LandRover Range Rover Autobiography 3.0',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Autobiography 3.0',
    code: 'X00436',
    key: 'LANDROVER_RANGE_ROVER_AUTOBIOGRAPHY_3_0'
  },
  {
    name: 'LandRover Range Rover Autobiography LWB 3.0',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Autobiography LWB 3.0',
    code: 'X00437',
    key: 'LANDROVER_RANGE_ROVER_AUTOBIOGRAPHY_LWB_3_0'
  },
  {
    name: 'LandRover Range Rover Autobiography LWB 3.0 I6',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Autobiography LWB 3.0 I6',
    code: 'X00438',
    key: 'LANDROVER_RANGE_ROVER_AUTOBIOGRAPHY_LWB_3_0_I6'
  },
  {
    name: 'LandRover Range Rover Autobiography LWB 5.0',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Autobiography LWB 5.0',
    code: 'X00439',
    key: 'LANDROVER_RANGE_ROVER_AUTOBIOGRAPHY_LWB_5_0'
  },
  {
    name: 'LandRover Range Rover Autobiography LWB 5.0 AT',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Autobiography LWB 5.0 AT',
    code: 'X00440',
    key: 'LANDROVER_RANGE_ROVER_AUTOBIOGRAPHY_LWB_5_0_AT'
  },
  {
    name: 'LandRover Range Rover Autobiography LWB 5.0 V8',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Autobiography LWB 5.0 V8',
    code: 'X00441',
    key: 'LANDROVER_RANGE_ROVER_AUTOBIOGRAPHY_LWB_5_0_V8'
  },
  {
    name: 'LandRover Range Rover Autobiography LWB Black Edition',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Autobiography LWB Black Edition',
    code: 'X00442',
    key: 'LANDROVER_RANGE_ROVER_AUTOBIOGRAPHY_LWB_BLACK_EDITION'
  },
  {
    name: 'LandRover Range Rover Evoque 2.0 AT',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Evoque 2.0 AT',
    code: 'X00443',
    key: 'LANDROVER_RANGE_ROVER_EVOQUE_2_0_AT'
  },
  {
    name: 'LandRover Range Rover Evoque Dynamic',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Evoque Dynamic',
    code: 'X00444',
    key: 'LANDROVER_RANGE_ROVER_EVOQUE_DYNAMIC'
  },
  {
    name: 'LandRover Range Rover Evoque HSE Dynamic',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Evoque HSE Dynamic',
    code: 'X00445',
    key: 'LANDROVER_RANGE_ROVER_EVOQUE_HSE_DYNAMIC'
  },
  {
    name: 'LandRover Range Rover Evoque Prestige',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Evoque Prestige',
    code: 'X00446',
    key: 'LANDROVER_RANGE_ROVER_EVOQUE_PRESTIGE'
  },
  {
    name: 'LandRover Range Rover Evoque SE',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Evoque SE',
    code: 'X00447',
    key: 'LANDROVER_RANGE_ROVER_EVOQUE_SE'
  },
  {
    name: 'LandRover Range Rover HSE 3.0',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover HSE 3.0',
    code: 'X00448',
    key: 'LANDROVER_RANGE_ROVER_HSE_3_0'
  },
  {
    name: 'LandRover Range Rover HSE Superchardged 5.0',
    brand: 'LANDROVER',
    code: 'X00967',
    key: 'LANDROVER_RANGE_ROVER_HSE_SUPERCHARDGED_5_0'
  },
  {
    name: 'LandRover Range Rover Sport HSE',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Sport HSE',
    code: 'X00449',
    key: 'LANDROVER_RANGE_ROVER_SPORT_HSE'
  },
  {
    name: 'LandRover Range Rover Sport Supercharged',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Sport Supercharged',
    code: 'X00450',
    key: 'LANDROVER_RANGE_ROVER_SPORT_SUPERCHARGED'
  },
  {
    name: 'LandRover Range Rover Sport Supercharged 5.0 AT',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Sport Supercharged 5.0 AT',
    code: 'X00451',
    key: 'LANDROVER_RANGE_ROVER_SPORT_SUPERCHARGED_5_0_AT'
  },
  {
    name: 'LandRover Range Rover SV Autobiography LWB 3.0D Hybrid',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover SV Autobiography LWB 3.0D Hybrid',
    code: 'X00452',
    key: 'LANDROVER_RANGE_ROVER_SV_AUTOBIOGRAPHY_LWB_3_0D_HYBRID'
  },
  {
    name: 'LandRover Range Rover SV Autobiography LWB 5.0',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover SV Autobiography LWB 5.0',
    code: 'X00453',
    key: 'LANDROVER_RANGE_ROVER_SV_AUTOBIOGRAPHY_LWB_5_0'
  },
  {
    name: 'LandRover Range Rover SVAutobiography LWB 3.0 I6',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover SVAutobiography LWB 3.0 I6',
    code: 'X00454',
    key: 'LANDROVER_RANGE_ROVER_SVAUTOBIOGRAPHY_LWB_3_0_I6'
  },
  {
    name: 'LandRover Range Rover SVAutobiography LWB 5.0 V8',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover SVAutobiography LWB 5.0 V8',
    code: 'X00455',
    key: 'LANDROVER_RANGE_ROVER_SVAUTOBIOGRAPHY_LWB_5_0_V8'
  },
  {
    name: 'LandRover Range Rover Velar R-Dynamic 3.0',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Velar R-Dynamic 3.0',
    code: 'X00456',
    key: 'LANDROVER_RANGE_ROVER_VELAR_R_DYNAMIC_3_0'
  },
  {
    name: 'LandRover Range Rover Vogue 3.0',
    brand: 'LANDROVER',
    model: 'Range Rover',
    version: 'Rover Vogue 3.0',
    code: 'X00457',
    key: 'LANDROVER_RANGE_ROVER_VOGUE_3_0'
  },
  {
    name: 'Lexus ES 250',
    brand: 'LEXUS',
    model: 'ES',
    version: 250,
    code: 'X00458',
    key: 'LEXUS_ES_250'
  },
  {
    name: 'Lexus ES 250 F Sport',
    brand: 'LEXUS',
    model: 'ES',
    version: '250 F Sport',
    code: 'X00459',
    key: 'LEXUS_ES_250_F_SPORT'
  },
  {
    name: 'Lexus ES 300h',
    brand: 'LEXUS',
    model: 'ES',
    version: '300h',
    code: 'X00460',
    key: 'LEXUS_ES_300H'
  },
  {
    name: 'Lexus GS 430',
    brand: 'LEXUS',
    model: 'GS',
    version: 430,
    code: 'X00461',
    key: 'LEXUS_GS_430'
  },
  {
    name: 'Lexus GX 460',
    brand: 'LEXUS',
    model: 'GX',
    version: 460,
    code: 'X00462',
    key: 'LEXUS_GX_460'
  },
  {
    name: 'Lexus GX 470',
    brand: 'LEXUS',
    model: 'GX',
    version: 470,
    code: 'X00463',
    key: 'LEXUS_GX_470'
  },
  {
    name: 'Lexus IS 250',
    brand: 'LEXUS',
    model: 'IS',
    version: 250,
    code: 'X00464',
    key: 'LEXUS_IS_250'
  },
  {
    name: 'Lexus IS 250C',
    brand: 'LEXUS',
    model: 'IS',
    version: '250C',
    code: 'X00465',
    key: 'LEXUS_IS_250C'
  },
  {
    name: 'Lexus IS 300 Luxury',
    brand: 'LEXUS',
    model: 'IS',
    version: '300 Luxury',
    code: 'X00466',
    key: 'LEXUS_IS_300_LUXURY'
  },
  {
    name: 'Lexus LM 350',
    brand: 'LEXUS',
    model: 'LM',
    version: 350,
    code: 'X00467',
    key: 'LEXUS_LM_350'
  },
  {
    name: 'Lexus LM 500h',
    brand: 'KIA',
    code: 'X00959',
    key: 'LEXUS_LM_500H'
  },
  {
    name: 'Lexus LS 460L',
    brand: 'LEXUS',
    model: 'LS',
    version: '460L',
    code: 'X00468',
    key: 'LEXUS_LS_460L'
  },
  {
    name: 'Lexus LX 470',
    brand: 'LEXUS',
    model: 'LX',
    version: 470,
    code: 'X00469',
    key: 'LEXUS_LX_470'
  },
  {
    name: 'Lexus LX 570',
    brand: 'LEXUS',
    model: 'LX',
    version: 570,
    code: 'X00470',
    key: 'LEXUS_LX_570'
  },
  {
    name: 'Lexus LX 570 Super Sport',
    brand: 'LEXUS',
    model: 'LX',
    version: '570 Super Sport',
    code: 'X00471',
    key: 'LEXUS_LX_570_SUPER_SPORT'
  },
  {
    name: 'Lexus LX 570 Super Sport MBS',
    brand: 'LEXUS',
    model: 'LX',
    version: '570 Super Sport MBS',
    code: 'X00472',
    key: 'LEXUS_LX_570_SUPER_SPORT_MBS'
  },
  {
    name: 'Lexus LX 600',
    brand: 'LEXUS',
    model: 'LX',
    version: 600,
    code: 'X00473',
    key: 'LEXUS_LX_600'
  },
  {
    name: 'Lexus LX 600 F-Sport',
    brand: 'LEXUS',
    model: 'LX',
    version: '600 F-Sport',
    code: 'X00474',
    key: 'LEXUS_LX_600_F_SPORT'
  },
  {
    name: 'Lexus LX 600 Urban',
    brand: 'LEXUS',
    model: 'LX',
    version: '600 Urban',
    code: 'X00475',
    key: 'LEXUS_LX_600_URBAN'
  },
  {
    name: 'Lexus LX 600 Vip',
    brand: 'LEXUS',
    model: 'LX',
    version: '600 Vip',
    code: 'X00476',
    key: 'LEXUS_LX_600_VIP'
  },
  {
    name: 'Lexus NX 200t',
    brand: 'LEXUS',
    model: 'NX',
    version: '200t',
    code: 'X00477',
    key: 'LEXUS_NX_200T'
  },
  {
    name: 'Lexus NX 300',
    brand: 'LEXUS',
    model: 'NX',
    version: 300,
    code: 'X00478',
    key: 'LEXUS_NX_300'
  },
  {
    name: 'Lexus RX 200t',
    brand: 'LEXUS',
    model: 'RX',
    version: '200t',
    code: 'X00479',
    key: 'LEXUS_RX_200T'
  },
  {
    name: 'Lexus RX 300',
    brand: 'LEXUS',
    model: 'RX',
    version: 300,
    code: 'X00480',
    key: 'LEXUS_RX_300'
  },
  {
    name: 'Lexus RX 350',
    brand: 'LEXUS',
    model: 'RX',
    version: 350,
    code: 'X00481',
    key: 'LEXUS_RX_350'
  },
  {
    name: 'Lexus RX 350 AWD',
    brand: 'LEXUS',
    model: 'RX',
    version: '350 AWD',
    code: 'X00482',
    key: 'LEXUS_RX_350_AWD'
  },
  {
    name: 'Lexus RX 350 F Sport',
    brand: 'LEXUS',
    model: 'RX',
    version: '350 F Sport',
    code: 'X00483',
    key: 'LEXUS_RX_350_F_SPORT'
  },
  {
    name: 'Lexus RX 350 F-Sport',
    brand: 'LEXUS',
    model: 'RX',
    version: '350 F-Sport',
    code: 'X00484',
    key: 'LEXUS_RX_350_F_SPORT'
  },
  {
    name: 'Lexus RX 350 Luxury',
    brand: 'LEXUS',
    model: 'RX',
    version: '350 Luxury',
    code: 'X00485',
    key: 'LEXUS_RX_350_LUXURY'
  },
  {
    name: 'Lexus RX 350 Premium',
    brand: 'LEXUS',
    model: 'RX',
    version: '350 Premium',
    code: 'X00486',
    key: 'LEXUS_RX_350_PREMIUM'
  },
  {
    name: 'Lexus RX 350 Premium 2.4 AT',
    brand: 'LEXUS',
    model: 'RX',
    version: '350 Premium 2.4 AT',
    code: 'X00487',
    key: 'LEXUS_RX_350_PREMIUM_2_4_AT'
  },
  {
    name: 'Lexus RX 350L',
    brand: 'LEXUS',
    model: 'RX',
    version: '350L',
    code: 'X00488',
    key: 'LEXUS_RX_350L'
  },
  {
    name: 'Lexus RX 450h',
    brand: 'LEXUS',
    model: 'RX',
    version: '450h',
    code: 'X00489',
    key: 'LEXUS_RX_450H'
  },
  {
    name: 'Maserati Ghibli 3.0 V6',
    brand: 'MASERATI',
    model: 'Ghibli',
    version: '3.0 V6',
    code: 'X00490',
    key: 'MASERATI_GHIBLI_3_0_V6'
  },
  {
    name: 'Maserati Levante 3.0 V6',
    brand: 'MASERATI',
    model: 'Levante',
    version: '3.0 V6',
    code: 'X00491',
    key: 'MASERATI_LEVANTE_3_0_V6'
  },
  {
    name: 'Maserati MC20 3.0 V6 AT',
    brand: 'MASERATI',
    model: 'MC20',
    version: '3.0 V6 AT',
    code: 'X00492',
    key: 'MASERATI_MC20_3_0_V6_AT'
  },
  {
    name: 'Mazda 2 1.5 AT',
    brand: 'MAZDA',
    model: 2,
    version: '1.5 AT',
    code: 'X00493',
    key: 'MAZDA_2_1_5_AT'
  },
  {
    name: 'Mazda 2 Luxury',
    brand: 'MAZDA',
    model: 2,
    version: 'Luxury',
    code: 'X00494',
    key: 'MAZDA_2_LUXURY'
  },
  {
    name: 'Mazda 2 Sport Luxury',
    brand: 'MAZDA',
    model: 2,
    version: 'Sport Luxury',
    code: 'X00495',
    key: 'MAZDA_2_SPORT_LUXURY'
  },
  {
    name: 'Mazda 3 1.5 AT',
    brand: 'MAZDA',
    model: 3,
    version: '1.5 AT',
    code: 'X00496',
    key: 'MAZDA_3_1_5_AT'
  },
  {
    name: 'Mazda 3 1.5 AT - 2016',
    brand: 'MAZDA',
    model: 3,
    version: '1.5 AT - 2016',
    code: 'X00497',
    key: 'MAZDA_3_1_5_AT_2016'
  },
  {
    name: 'Mazda 3 1.5L Deluxe',
    brand: 'MAZDA',
    model: 3,
    version: '1.5L Deluxe',
    code: 'X00498',
    key: 'MAZDA_3_1_5L_DELUXE'
  },
  {
    name: 'Mazda 3 1.5L Luxury',
    brand: 'MAZDA',
    model: 3,
    version: '1.5L Luxury',
    code: 'X00499',
    key: 'MAZDA_3_1_5L_LUXURY'
  },
  {
    name: 'Mazda 3 1.5L Premium',
    brand: 'MAZDA',
    model: 3,
    version: '1.5L Premium',
    code: 'X00500',
    key: 'MAZDA_3_1_5L_PREMIUM'
  },
  {
    name: 'Mazda 3 1.5L Sport Luxury',
    brand: 'MAZDA',
    model: 3,
    version: '1.5L Sport Luxury',
    code: 'X00501',
    key: 'MAZDA_3_1_5L_SPORT_LUXURY'
  },
  {
    name: 'Mazda 3 1.5L Sport Premium',
    brand: 'MAZDA',
    code: 'X00961',
    key: 'MAZDA_3_1_5L_SPORT_PREMIUM'
  },
  {
    name: 'Mazda 3 1.6 AT',
    brand: 'MAZDA',
    model: 3,
    version: '1.6 AT',
    code: 'X00502',
    key: 'MAZDA_3_1_6_AT'
  },
  {
    name: 'Mazda 3 2.0 AT',
    brand: 'MAZDA',
    model: 3,
    version: '2.0 AT',
    code: 'X00503',
    key: 'MAZDA_3_2_0_AT'
  },
  {
    name: 'Mazda 3 2.0L Sport Signature Premium',
    brand: 'MAZDA',
    model: 3,
    version: '2.0L Sport Signature Premium',
    code: 'X00504',
    key: 'MAZDA_3_2_0L_SPORT_SIGNATURE_PREMIUM'
  },
  {
    name: 'Mazda 3 Luxury',
    brand: 'MAZDA',
    model: 3,
    version: 'Luxury',
    code: 'X00505',
    key: 'MAZDA_3_LUXURY'
  },
  {
    name: 'Mazda 3 S 1.6 AT',
    brand: 'MAZDA',
    model: 3,
    version: 'S 1.6 AT',
    code: 'X00506',
    key: 'MAZDA_3_S_1_6_AT'
  },
  {
    name: 'Mazda 6 2.0 AT',
    brand: 'MAZDA',
    model: 6,
    version: '2.0 AT',
    code: 'X00507',
    key: 'MAZDA_6_2_0_AT'
  },
  {
    name: 'Mazda 6 2.0L Premium',
    brand: 'MAZDA',
    model: 6,
    version: '2.0L Premium',
    code: 'X00508',
    key: 'MAZDA_6_2_0L_PREMIUM'
  },
  {
    name: 'Mazda 6 2.5 AT',
    brand: 'MAZDA',
    model: 6,
    version: '2.5 AT',
    code: 'X00509',
    key: 'MAZDA_6_2_5_AT'
  },
  {
    name: 'Mazda 6 2.5L Premium',
    brand: 'MAZDA',
    model: 6,
    version: '2.5L Premium',
    code: 'X00510',
    key: 'MAZDA_6_2_5L_PREMIUM'
  },
  {
    name: 'Mazda 6 Deluxe 2.0 AT',
    brand: 'MAZDA',
    model: 6,
    version: 'Deluxe 2.0 AT',
    code: 'X00511',
    key: 'MAZDA_6_DELUXE_2_0_AT'
  },
  {
    name: 'Mazda 6 Luxury 2.0 AT',
    brand: 'MAZDA',
    model: 6,
    version: 'Luxury 2.0 AT',
    code: 'X00512',
    key: 'MAZDA_6_LUXURY_2_0_AT'
  },
  {
    name: 'Mazda 6 Premium 2.0 AT',
    brand: 'MAZDA',
    model: 6,
    version: 'Premium 2.0 AT',
    code: 'X00513',
    key: 'MAZDA_6_PREMIUM_2_0_AT'
  },
  {
    name: 'Mazda 6 Signature Premium 2.5 AT',
    brand: 'MAZDA',
    model: 6,
    version: 'Signature Premium 2.5 AT',
    code: 'X00514',
    key: 'MAZDA_6_SIGNATURE_PREMIUM_2_5_AT'
  },
  {
    name: 'Mazda 626 2.0 MT',
    brand: 'MAZDA',
    model: 626,
    version: '2.0 MT',
    code: 'X00515',
    key: 'MAZDA_626_2_0_MT'
  },
  {
    name: 'Mazda BT50 2.2L 4x2 AT',
    brand: 'MAZDA',
    model: 'BT50',
    version: '2.2L 4x2 AT',
    code: 'X00516',
    key: 'MAZDA_BT50_2_2L_4X2_AT'
  },
  {
    name: 'Mazda BT50 2.2L 4x4 MT',
    brand: 'MAZDA',
    model: 'BT50',
    version: '2.2L 4x4 MT',
    code: 'X00517',
    key: 'MAZDA_BT50_2_2L_4X4_MT'
  },
  {
    name: 'Mazda BT50 3.2L 4x4 AT',
    brand: 'MAZDA',
    model: 'BT50',
    version: '3.2L 4x4 AT',
    code: 'X00518',
    key: 'MAZDA_BT50_3_2L_4X4_AT'
  },
  {
    name: 'Mazda BT50 Luxury 2.2L 4x2 AT',
    brand: 'MAZDA',
    model: 'BT50',
    version: 'Luxury 2.2L 4x2 AT',
    code: 'X00519',
    key: 'MAZDA_BT50_LUXURY_2_2L_4X2_AT'
  },
  {
    name: 'Mazda BT50 Standard 2.2L 4x4 MT',
    brand: 'MAZDA',
    model: 'BT50',
    version: 'Standard 2.2L 4x4 MT',
    code: 'X00520',
    key: 'MAZDA_BT50_STANDARD_2_2L_4X4_MT'
  },
  {
    name: 'Mazda CX 30 Luxury 2.0 AT',
    brand: 'MAZDA',
    model: 'CX 30',
    version: '30 Luxury 2.0 AT',
    code: 'X00521',
    key: 'MAZDA_CX_30_LUXURY_2_0_AT'
  },
  {
    name: 'Mazda CX 30 Premium 2.0 AT',
    brand: 'MAZDA',
    model: 'CX 30',
    version: '30 Premium 2.0 AT',
    code: 'X00522',
    key: 'MAZDA_CX_30_PREMIUM_2_0_AT'
  },
  {
    name: 'Mazda CX3 Deluxe 1.5 AT',
    brand: 'MAZDA',
    model: 'CX3',
    version: 'Deluxe 1.5 AT',
    code: 'X00523',
    key: 'MAZDA_CX3_DELUXE_1_5_AT'
  },
  {
    name: 'Mazda CX3 Luxury 1.5 AT',
    brand: 'MAZDA',
    model: 'CX3',
    version: 'Luxury 1.5 AT',
    code: 'X00524',
    key: 'MAZDA_CX3_LUXURY_1_5_AT'
  },
  {
    name: 'Mazda CX3 Premium 1.5 AT',
    brand: 'MAZDA',
    model: 'CX3',
    version: 'Premium 1.5 AT',
    code: 'X00525',
    key: 'MAZDA_CX3_PREMIUM_1_5_AT'
  },
  {
    name: 'Mazda CX5 2.0 AT',
    brand: 'MAZDA',
    model: 'CX5',
    version: '2.0 AT',
    code: 'X00526',
    key: 'MAZDA_CX5_2_0_AT'
  },
  {
    name: 'Mazda CX5 2.0 Deluxe',
    brand: 'MAZDA',
    model: 'CX5',
    version: '2.0 Deluxe',
    code: 'X00527',
    key: 'MAZDA_CX5_2_0_DELUXE'
  },
  {
    name: 'Mazda CX5 2.0 Luxury',
    brand: 'MAZDA',
    model: 'CX5',
    version: '2.0 Luxury',
    code: 'X00528',
    key: 'MAZDA_CX5_2_0_LUXURY'
  },
  {
    name: 'Mazda CX5 2.0 Premium',
    brand: 'MAZDA',
    model: 'CX5',
    version: '2.0 Premium',
    code: 'X00529',
    key: 'MAZDA_CX5_2_0_PREMIUM'
  },
  {
    name: 'Mazda CX5 2.5 AT',
    brand: 'MAZDA',
    model: 'CX5',
    version: '2.5 AT',
    code: 'X00530',
    key: 'MAZDA_CX5_2_5_AT'
  },
  {
    name: 'Mazda CX5 2.5 AT 2WD',
    brand: 'MAZDA',
    model: 'CX5',
    version: '2.5 AT 2WD',
    code: 'X00531',
    key: 'MAZDA_CX5_2_5_AT_2WD'
  },
  {
    name: 'Mazda CX5 2.5 AT AWD',
    brand: 'MAZDA',
    model: 'CX5',
    version: '2.5 AT AWD',
    code: 'X00532',
    key: 'MAZDA_CX5_2_5_AT_AWD'
  },
  {
    name: 'Mazda CX5 2.5 Signature Premium 2WD',
    brand: 'MAZDA',
    model: 'CX5',
    version: '2.5 Signature Premium 2WD',
    code: 'X00533',
    key: 'MAZDA_CX5_2_5_SIGNATURE_PREMIUM_2WD'
  },
  {
    name: 'Mazda CX5 2.5 Signature Premium AWD I-Activ',
    brand: 'MAZDA',
    code: 'X00954',
    key: 'MAZDA_CX5_2_5_SIGNATURE_PREMIUM_AWD_I_ACTIV'
  },
  {
    name: 'Mazda CX5 Deluxe 2.0 AT',
    brand: 'MAZDA',
    model: 'CX5',
    version: 'Deluxe 2.0 AT',
    code: 'X00534',
    key: 'MAZDA_CX5_DELUXE_2_0_AT'
  },
  {
    name: 'Mazda CX5 Luxury 2.0 AT',
    brand: 'MAZDA',
    model: 'CX5',
    version: 'Luxury 2.0 AT',
    code: 'X00535',
    key: 'MAZDA_CX5_LUXURY_2_0_AT'
  },
  {
    name: 'Mazda CX5 Premium 2.0 AT',
    brand: 'MAZDA',
    model: 'CX5',
    version: 'Premium 2.0 AT',
    code: 'X00536',
    key: 'MAZDA_CX5_PREMIUM_2_0_AT'
  },
  {
    name: 'Mazda CX5 Premium Exclusive 2.0 AT',
    brand: 'MAZDA',
    model: 'CX5',
    version: 'Premium Exclusive 2.0 AT',
    code: 'X00537',
    key: 'MAZDA_CX5_PREMIUM_EXCLUSIVE_2_0_AT'
  },
  {
    name: 'Mazda CX5 Premium Sport 2.0 AT',
    brand: 'MAZDA',
    model: 'CX5',
    version: 'Premium Sport 2.0 AT',
    code: 'X00538',
    key: 'MAZDA_CX5_PREMIUM_SPORT_2_0_AT'
  },
  {
    name: 'Mazda CX5 Signature Premium 2.5 AT AWD I-Activ',
    brand: 'MAZDA',
    model: 'CX5',
    version: 'Signature Premium 2.5 AT AWD I-Activ',
    code: 'X00539',
    key: 'MAZDA_CX5_SIGNATURE_PREMIUM_2_5_AT_AWD_I_ACTIV'
  },
  {
    name: 'Mazda CX8 Deluxe',
    brand: 'MAZDA',
    model: 'CX8',
    version: 'Deluxe',
    code: 'X00540',
    key: 'MAZDA_CX8_DELUXE'
  },
  {
    name: 'Mazda CX8 Luxury',
    brand: 'MAZDA',
    model: 'CX8',
    version: 'Luxury',
    code: 'X00541',
    key: 'MAZDA_CX8_LUXURY'
  },
  {
    name: 'Mazda CX8 Premium',
    brand: 'MAZDA',
    model: 'CX8',
    version: 'Premium',
    code: 'X00542',
    key: 'MAZDA_CX8_PREMIUM'
  },
  {
    name: 'Mazda CX8 Premium 2.5 AT',
    brand: 'MAZDA',
    model: 'CX8',
    version: 'Premium 2.5 AT',
    code: 'X00543',
    key: 'MAZDA_CX8_PREMIUM_2_5_AT'
  },
  {
    name: 'Mazda CX8 Premium AWD',
    brand: 'MAZDA',
    model: 'CX8',
    version: 'Premium AWD',
    code: 'X00544',
    key: 'MAZDA_CX8_PREMIUM_AWD'
  },
  {
    name: 'Mercedes Benz A class A250 Sport AMG',
    brand: 'MERCEDES_BENZ',
    model: 'A class',
    version: 'A class A250 Sport AMG',
    code: 'X00545',
    key: 'MERCEDES_BENZ_A_CLASS_A250_SPORT_AMG'
  },
  {
    name: 'Mercedes Benz A class A35 AMG 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'A class',
    version: 'A class A35 AMG 4Matic',
    code: 'X00546',
    key: 'MERCEDES_BENZ_A_CLASS_A35_AMG_4MATIC'
  },
  {
    name: 'Mercedes Benz C class C180',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C180',
    code: 'X00547',
    key: 'MERCEDES_BENZ_C_CLASS_C180'
  },
  {
    name: 'Mercedes Benz C class C180 AMG',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C180 AMG',
    code: 'X00548',
    key: 'MERCEDES_BENZ_C_CLASS_C180_AMG'
  },
  {
    name: 'Mercedes Benz C class C200',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C200',
    code: 'X00549',
    key: 'MERCEDES_BENZ_C_CLASS_C200'
  },
  {
    name: 'Mercedes Benz C class C200 Avantgarde',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C200 Avantgarde',
    code: 'X00550',
    key: 'MERCEDES_BENZ_C_CLASS_C200_AVANTGARDE'
  },
  {
    name: 'Mercedes Benz C class C200 Avantgarde Plus',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C200 Avantgarde Plus',
    code: 'X00551',
    key: 'MERCEDES_BENZ_C_CLASS_C200_AVANTGARDE_PLUS'
  },
  {
    name: 'Mercedes Benz C class C200 Exclusive',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C200 Exclusive',
    code: 'X00552',
    key: 'MERCEDES_BENZ_C_CLASS_C200_EXCLUSIVE'
  },
  {
    name: 'Mercedes Benz C class C240 Avantgarde',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C240 Avantgarde',
    code: 'X00553',
    key: 'MERCEDES_BENZ_C_CLASS_C240_AVANTGARDE'
  },
  {
    name: 'Mercedes Benz C class C250',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C250',
    code: 'X00554',
    key: 'MERCEDES_BENZ_C_CLASS_C250'
  },
  {
    name: 'Mercedes Benz C class C250 AMG',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C250 AMG',
    code: 'X00555',
    key: 'MERCEDES_BENZ_C_CLASS_C250_AMG'
  },
  {
    name: 'Mercedes Benz C class C250 CGI',
    brand: 'MERCEDES_BENZ',
    code: 'X00942',
    key: 'MERCEDES_BENZ_C_CLASS_C250_CGI'
  },
  {
    name: 'Mercedes Benz C class C250 Exclusive',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C250 Exclusive',
    code: 'X00556',
    key: 'MERCEDES_BENZ_C_CLASS_C250_EXCLUSIVE'
  },
  {
    name: 'Mercedes Benz C class C300 AMG',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C300 AMG',
    code: 'X00557',
    key: 'MERCEDES_BENZ_C_CLASS_C300_AMG'
  },
  {
    name: 'Mercedes Benz C class C300 AMG 2.0 AT',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C300 AMG 2.0 AT',
    code: 'X00558',
    key: 'MERCEDES_BENZ_C_CLASS_C300_AMG_2_0_AT'
  },
  {
    name: 'Mercedes Benz C class C43 AMG 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'C class',
    version: 'C class C43 AMG 4Matic',
    code: 'X00559',
    key: 'MERCEDES_BENZ_C_CLASS_C43_AMG_4MATIC'
  },
  {
    name: 'Mercedes Benz CLA class CLA 200',
    brand: 'MERCEDES_BENZ',
    model: 'CLA class',
    version: 'CLA class CLA 200',
    code: 'X00560',
    key: 'MERCEDES_BENZ_CLA_CLASS_CLA_200'
  },
  {
    name: 'Mercedes Benz CLA class CLA 250 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'CLA class',
    version: 'CLA class CLA 250 4Matic',
    code: 'X00561',
    key: 'MERCEDES_BENZ_CLA_CLASS_CLA_250_4MATIC'
  },
  {
    name: 'Mercedes Benz CLA class CLA 45 AMG 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'CLA class',
    version: 'CLA class CLA 45 AMG 4Matic',
    code: 'X00562',
    key: 'MERCEDES_BENZ_CLA_CLASS_CLA_45_AMG_4MATIC'
  },
  {
    name: 'Mercedes Benz E class E180',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E180',
    code: 'X00563',
    key: 'MERCEDES_BENZ_E_CLASS_E180'
  },
  {
    name: 'Mercedes Benz E class E200',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E200',
    code: 'X00564',
    key: 'MERCEDES_BENZ_E_CLASS_E200'
  },
  {
    name: 'Mercedes Benz E class E200 2.0 AT',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E200 2.0 AT',
    code: 'X00565',
    key: 'MERCEDES_BENZ_E_CLASS_E200_2_0_AT'
  },
  {
    name: 'Mercedes Benz E class E200 Edition',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E200 Edition',
    code: 'X00566',
    key: 'MERCEDES_BENZ_E_CLASS_E200_EDITION'
  },
  {
    name: 'Mercedes Benz E class E200 Edition 2.0 AT',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E200 Edition 2.0 AT',
    code: 'X00567',
    key: 'MERCEDES_BENZ_E_CLASS_E200_EDITION_2_0_AT'
  },
  {
    name: 'Mercedes Benz E class E200 Exclusive',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E200 Exclusive',
    code: 'X00568',
    key: 'MERCEDES_BENZ_E_CLASS_E200_EXCLUSIVE'
  },
  {
    name: 'Mercedes Benz E class E200 Sport',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E200 Sport',
    code: 'X00569',
    key: 'MERCEDES_BENZ_E_CLASS_E200_SPORT'
  },
  {
    name: 'Mercedes Benz E class E250',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E250',
    code: 'X00570',
    key: 'MERCEDES_BENZ_E_CLASS_E250'
  },
  {
    name: 'Mercedes Benz E class E280',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E280',
    code: 'X00571',
    key: 'MERCEDES_BENZ_E_CLASS_E280'
  },
  {
    name: 'Mercedes Benz E class E300',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E300',
    code: 'X00572',
    key: 'MERCEDES_BENZ_E_CLASS_E300'
  },
  {
    name: 'Mercedes Benz E class E300 AMG',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E300 AMG',
    code: 'X00573',
    key: 'MERCEDES_BENZ_E_CLASS_E300_AMG'
  },
  {
    name: 'Mercedes Benz E class E400 AMG',
    brand: 'MERCEDES_BENZ',
    model: 'E class',
    version: 'E class E400 AMG',
    code: 'X00574',
    key: 'MERCEDES_BENZ_E_CLASS_E400_AMG'
  },
  {
    name: 'Mercedes Benz EQE 500 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'EQE 500',
    version: 'EQE 500 4Matic',
    code: 'X00575',
    key: 'MERCEDES_BENZ_EQE_500_4MATIC'
  },
  {
    name: 'Mercedes Benz EQS 450 Plus',
    brand: 'MERCEDES_BENZ',
    model: 'EQS 450',
    version: 'EQS 450 Plus',
    code: 'X00576',
    key: 'MERCEDES_BENZ_EQS_450_PLUS'
  },
  {
    name: 'Mercedes Benz G class G63 AMG',
    brand: 'MERCEDES_BENZ',
    model: 'G class',
    version: 'G class G63 AMG',
    code: 'X00577',
    key: 'MERCEDES_BENZ_G_CLASS_G63_AMG'
  },
  {
    name: 'Mercedes Benz GL 350 BlueTec 4Matic',
    brand: 'MERCEDES_BENZ',
    code: 'X00965',
    key: 'MERCEDES_BENZ_GL_350_BLUETEC_4MATIC'
  },
  {
    name: 'Mercedes Benz GLA class GLA 200',
    brand: 'MERCEDES_BENZ',
    code: 'X00958',
    key: 'MERCEDES_BENZ_GLA_CLASS_GLA_200'
  },
  {
    name: 'Mercedes Benz GLA class GLA 45 AMG 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLA class',
    version: 'GLA class GLA 45 AMG 4Matic',
    code: 'X00578',
    key: 'MERCEDES_BENZ_GLA_CLASS_GLA_45_AMG_4MATIC'
  },
  {
    name: 'Mercedes Benz GLB 200 AMG',
    brand: 'MERCEDES_BENZ',
    model: 'GLB 200',
    version: 'GLB 200 AMG',
    code: 'X00579',
    key: 'MERCEDES_BENZ_GLB_200_AMG'
  },
  {
    name: 'Mercedes Benz GLB 35 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLB 35',
    version: 'GLB 35 4Matic',
    code: 'X00580',
    key: 'MERCEDES_BENZ_GLB_35_4MATIC'
  },
  {
    name: 'Mercedes Benz GLC 200',
    brand: 'MERCEDES_BENZ',
    model: '#VALUE!',
    version: 'GLC 200',
    code: 'X00581',
    key: 'MERCEDES_BENZ_GLC_200'
  },
  {
    name: 'Mercedes Benz GLC 200 2.0 AT',
    brand: 'MERCEDES_BENZ',
    model: 'GLC 200',
    version: 'GLC 200 2.0 AT',
    code: 'X00582',
    key: 'MERCEDES_BENZ_GLC_200_2_0_AT'
  },
  {
    name: 'Mercedes Benz GLC 200 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLC 200',
    version: 'GLC 200 4Matic',
    code: 'X00583',
    key: 'MERCEDES_BENZ_GLC_200_4MATIC'
  },
  {
    name: 'Mercedes Benz GLC 250 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLC 250',
    version: 'GLC 250 4Matic',
    code: 'X00584',
    key: 'MERCEDES_BENZ_GLC_250_4MATIC'
  },
  {
    name: 'Mercedes Benz GLC 300 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLC 300',
    version: 'GLC 300 4Matic',
    code: 'X00585',
    key: 'MERCEDES_BENZ_GLC_300_4MATIC'
  },
  {
    name: 'Mercedes Benz GLC 300 Coupe 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLC 300',
    version: 'GLC 300 Coupe 4Matic',
    code: 'X00586',
    key: 'MERCEDES_BENZ_GLC_300_COUPE_4MATIC'
  },
  {
    name: 'Mercedes Benz GLE Class GLE 400 4Matic Coupe',
    brand: 'MERCEDES_BENZ',
    model: 'GLE Class',
    version: 'GLE Class GLE 400 4Matic Coupe',
    code: 'X00587',
    key: 'MERCEDES_BENZ_GLE_CLASS_GLE_400_4MATIC_COUPE'
  },
  {
    name: 'Mercedes Benz GLE Class GLE 450 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLE Class',
    version: 'GLE Class GLE 450 4Matic',
    code: 'X00588',
    key: 'MERCEDES_BENZ_GLE_CLASS_GLE_450_4MATIC'
  },
  {
    name: 'Mercedes Benz GLE Class GLE 450 AMG 4Matic Coupe',
    brand: 'MERCEDES_BENZ',
    model: 'GLE Class',
    version: 'GLE Class GLE 450 AMG 4Matic Coupe',
    code: 'X00589',
    key: 'MERCEDES_BENZ_GLE_CLASS_GLE_450_AMG_4MATIC_COUPE'
  },
  {
    name: 'Mercedes Benz GLE Class GLE 53 4Matic+ Coupe AMG',
    brand: 'MERCEDES_BENZ',
    model: 'GLE Class',
    version: 'GLE Class GLE 53 4Matic+ Coupe AMG',
    code: 'X00590',
    key: 'MERCEDES_BENZ_GLE_CLASS_GLE_53_4MATIC_COUPE_AMG'
  },
  {
    name: 'Mercedes Benz GLK Class GLK220 CDI 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLK Class',
    version: 'GLK Class GLK220 CDI 4Matic',
    code: 'X00591',
    key: 'MERCEDES_BENZ_GLK_CLASS_GLK220_CDI_4MATIC'
  },
  {
    name: 'Mercedes Benz GLK Class GLK250 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLK Class',
    version: 'GLK Class GLK250 4Matic',
    code: 'X00592',
    key: 'MERCEDES_BENZ_GLK_CLASS_GLK250_4MATIC'
  },
  {
    name: 'Mercedes Benz GLK Class GLK300 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLK Class',
    version: 'GLK Class GLK300 4Matic',
    code: 'X00593',
    key: 'MERCEDES_BENZ_GLK_CLASS_GLK300_4MATIC'
  },
  {
    name: 'Mercedes Benz GLS 400 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLS 400',
    version: 'GLS 400 4Matic',
    code: 'X00594',
    key: 'MERCEDES_BENZ_GLS_400_4MATIC'
  },
  {
    name: 'Mercedes Benz GLS 450 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'GLS 450',
    version: 'GLS 450 4Matic',
    code: 'X00595',
    key: 'MERCEDES_BENZ_GLS_450_4MATIC'
  },
  {
    name: 'Mercedes Benz Maybach GLS 480 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'Maybach GLS',
    version: 'Maybach GLS 480 4Matic',
    code: 'X00596',
    key: 'MERCEDES_BENZ_MAYBACH_GLS_480_4MATIC'
  },
  {
    name: 'Mercedes Benz Maybach GLS 600 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'Maybach GLS',
    version: 'Maybach GLS 600 4Matic',
    code: 'X00597',
    key: 'MERCEDES_BENZ_MAYBACH_GLS_600_4MATIC'
  },
  {
    name: 'Mercedes Benz Maybach S400',
    brand: 'MERCEDES_BENZ',
    model: '#VALUE!',
    version: 'Maybach S400',
    code: 'X00598',
    key: 'MERCEDES_BENZ_MAYBACH_S400'
  },
  {
    name: 'Mercedes Benz Maybach S450 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'Maybach S450',
    version: 'Maybach S450 4Matic',
    code: 'X00599',
    key: 'MERCEDES_BENZ_MAYBACH_S450_4MATIC'
  },
  {
    name: 'Mercedes Benz Maybach S500',
    brand: 'MERCEDES_BENZ',
    model: '#VALUE!',
    version: 'Maybach S500',
    code: 'X00600',
    key: 'MERCEDES_BENZ_MAYBACH_S500'
  },
  {
    name: 'Mercedes Benz Maybach S600',
    brand: 'MERCEDES_BENZ',
    model: '#VALUE!',
    version: 'Maybach S600',
    code: 'X00601',
    key: 'MERCEDES_BENZ_MAYBACH_S600'
  },
  {
    name: 'Mercedes Benz Maybach S680 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'Maybach S680',
    version: 'Maybach S680 4Matic',
    code: 'X00602',
    key: 'MERCEDES_BENZ_MAYBACH_S680_4MATIC'
  },
  {
    name: 'Mercedes Benz ML Class ML350',
    brand: 'MERCEDES_BENZ',
    model: 'ML Class',
    version: 'ML Class ML350',
    code: 'X00603',
    key: 'MERCEDES_BENZ_ML_CLASS_ML350'
  },
  {
    name: 'Mercedes Benz R class R500 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'R class',
    version: 'R class R500 4Matic',
    code: 'X00604',
    key: 'MERCEDES_BENZ_R_CLASS_R500_4MATIC'
  },
  {
    name: 'Mercedes Benz S class S350',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S350',
    code: 'X00605',
    key: 'MERCEDES_BENZ_S_CLASS_S350'
  },
  {
    name: 'Mercedes Benz S class S400L',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S400L',
    code: 'X00606',
    key: 'MERCEDES_BENZ_S_CLASS_S400L'
  },
  {
    name: 'Mercedes Benz S class S450 4Matic',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S450 4Matic',
    code: 'X00607',
    key: 'MERCEDES_BENZ_S_CLASS_S450_4MATIC'
  },
  {
    name: 'Mercedes Benz S class S450 4Matic Luxury',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S450 4Matic Luxury',
    code: 'X00608',
    key: 'MERCEDES_BENZ_S_CLASS_S450_4MATIC_LUXURY'
  },
  {
    name: 'Mercedes Benz S class S450 4Matic Luxury 3.0 AT',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S450 4Matic Luxury 3.0 AT',
    code: 'X00609',
    key: 'MERCEDES_BENZ_S_CLASS_S450_4MATIC_LUXURY_3_0_AT'
  },
  {
    name: 'Mercedes Benz S class S450 Luxury',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S450 Luxury',
    code: 'X00610',
    key: 'MERCEDES_BENZ_S_CLASS_S450_LUXURY'
  },
  {
    name: 'Mercedes Benz S class S450L',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S450L',
    code: 'X00611',
    key: 'MERCEDES_BENZ_S_CLASS_S450L'
  },
  {
    name: 'Mercedes Benz S class S450L Luxury',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S450L Luxury',
    code: 'X00612',
    key: 'MERCEDES_BENZ_S_CLASS_S450L_LUXURY'
  },
  {
    name: 'Mercedes Benz S class S500L',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S500L',
    code: 'X00613',
    key: 'MERCEDES_BENZ_S_CLASS_S500L'
  },
  {
    name: 'Mercedes Benz S class S550',
    brand: 'MERCEDES_BENZ',
    model: 'S class',
    version: 'S class S550',
    code: 'X00614',
    key: 'MERCEDES_BENZ_S_CLASS_S550'
  },
  {
    name: 'Mercedes Benz V class V220d CDI',
    brand: 'MERCEDES_BENZ',
    model: 'V class',
    version: 'V class V220d CDI',
    code: 'X00615',
    key: 'MERCEDES_BENZ_V_CLASS_V220D_CDI'
  },
  {
    name: 'Mercedes Benz V class V250 AMG',
    brand: 'MERCEDES_BENZ',
    model: 'V class',
    version: 'V class V250 AMG',
    code: 'X00616',
    key: 'MERCEDES_BENZ_V_CLASS_V250_AMG'
  },
  {
    name: 'Mercedes Benz V class V250 Avantgarde',
    brand: 'MERCEDES_BENZ',
    model: 'V class',
    version: 'V class V250 Avantgarde',
    code: 'X00617',
    key: 'MERCEDES_BENZ_V_CLASS_V250_AVANTGARDE'
  },
  {
    name: 'Mercedes Benz V class V250 Luxury',
    brand: 'MERCEDES_BENZ',
    model: 'V class',
    version: 'V class V250 Luxury',
    code: 'X00618',
    key: 'MERCEDES_BENZ_V_CLASS_V250_LUXURY'
  },
  {
    name: 'Mercedes Benz Vito Tourer 121 V2',
    brand: 'MERCEDES_BENZ',
    model: 'Vito Tourer',
    version: 'Vito Tourer 121 V2',
    code: 'X00619',
    key: 'MERCEDES_BENZ_VITO_TOURER_121_V2'
  },
  {
    name: 'MG 5 1.5 CVT STD',
    brand: 'MG',
    model: 5,
    version: '1.5 CVT STD',
    code: 'X00620',
    key: 'MG_5_1_5_CVT_STD'
  },
  {
    name: 'MG 5 1.5 MT',
    brand: 'MG',
    model: 5,
    version: '1.5 MT',
    code: 'X00621',
    key: 'MG_5_1_5_MT'
  },
  {
    name: 'MG 5 Luxury 1.5 AT',
    brand: 'MG',
    model: 5,
    version: 'Luxury 1.5 AT',
    code: 'X00622',
    key: 'MG_5_LUXURY_1_5_AT'
  },
  {
    name: 'MG 5 Standard 1.5 AT',
    brand: 'MG',
    model: 5,
    version: 'Standard 1.5 AT',
    code: 'X00623',
    key: 'MG_5_STANDARD_1_5_AT'
  },
  {
    name: 'MG RX5 1.5T STD',
    brand: 'MG',
    model: 'RX5',
    version: '1.5T STD',
    code: 'X00624',
    key: 'MG_RX5_1_5T_STD'
  },
  {
    name: 'MG ZS Comfort 1.5 AT 2WD',
    brand: 'MG',
    model: 'ZS',
    version: 'Comfort 1.5 AT 2WD',
    code: 'X00625',
    key: 'MG_ZS_COMFORT_1_5_AT_2WD'
  },
  {
    name: 'MG ZS Luxury 1.5 AT 2WD',
    brand: 'MG',
    model: 'ZS',
    version: 'Luxury 1.5 AT 2WD',
    code: 'X00626',
    key: 'MG_ZS_LUXURY_1_5_AT_2WD'
  },
  {
    name: 'MG ZS Standard 1.5 AT 2WD',
    brand: 'MG',
    model: 'ZS',
    version: 'Standard 1.5 AT 2WD',
    code: 'X00627',
    key: 'MG_ZS_STANDARD_1_5_AT_2WD'
  },
  {
    name: 'Mini Cooper 3Dr',
    brand: 'MINI',
    model: 'Cooper',
    version: '3Dr',
    code: 'X00628',
    key: 'MINI_COOPER_3DR'
  },
  {
    name: 'Mini Cooper Convertible S',
    brand: 'MINI',
    model: 'Cooper',
    version: 'Convertible S',
    code: 'X00629',
    key: 'MINI_COOPER_CONVERTIBLE_S'
  },
  {
    name: 'Mini Cooper Countryman S',
    brand: 'MINI',
    model: 'Cooper',
    version: 'Countryman S',
    code: 'X00630',
    key: 'MINI_COOPER_COUNTRYMAN_S'
  },
  {
    name: 'Mini Cooper JCW Convertible',
    brand: 'MINI',
    model: 'Cooper',
    version: 'JCW Convertible',
    code: 'X00631',
    key: 'MINI_COOPER_JCW_CONVERTIBLE'
  },
  {
    name: 'Mini Cooper JCW S',
    brand: 'MINI',
    model: 'Cooper',
    version: 'JCW S',
    code: 'X00632',
    key: 'MINI_COOPER_JCW_S'
  },
  {
    name: 'Mini Cooper S 3 Door',
    brand: 'MINI',
    model: 'Cooper',
    version: 'S 3 Door',
    code: 'X00633',
    key: 'MINI_COOPER_S_3_DOOR'
  },
  {
    name: 'Mini Cooper S 5 Door',
    brand: 'MINI',
    model: 'Cooper',
    version: 'S 5 Door',
    code: 'X00634',
    key: 'MINI_COOPER_S_5_DOOR'
  },
  {
    name: 'Mini Cooper S Convertible',
    brand: 'MINI',
    model: 'Cooper',
    version: 'S Convertible',
    code: 'X00635',
    key: 'MINI_COOPER_S_CONVERTIBLE'
  },
  {
    name: 'Mitsubishi Attrage 1.2 CVT',
    brand: 'MITSUBISHI',
    model: 'Attrage',
    version: '1.2 CVT',
    code: 'X00636',
    key: 'MITSUBISHI_ATTRAGE_1_2_CVT'
  },
  {
    name: 'Mitsubishi Attrage 1.2 MT',
    brand: 'MITSUBISHI',
    model: 'Attrage',
    version: '1.2 MT',
    code: 'X00637',
    key: 'MITSUBISHI_ATTRAGE_1_2_MT'
  },
  {
    name: 'Mitsubishi Attrage 1.2CVT',
    brand: 'MITSUBISHI',
    model: 'Attrage',
    version: '1.2CVT',
    code: 'X00638',
    key: 'MITSUBISHI_ATTRAGE_1_2CVT'
  },
  {
    name: 'Mitsubishi Attrage 1.2MT',
    brand: 'MITSUBISHI',
    model: 'Attrage',
    version: '1.2MT',
    code: 'X00639',
    key: 'MITSUBISHI_ATTRAGE_1_2MT'
  },
  {
    name: 'Mitsubishi Attrage Premium 1.2 CVT',
    brand: 'MITSUBISHI',
    model: 'Attrage',
    version: 'Premium 1.2 CVT',
    code: 'X00640',
    key: 'MITSUBISHI_ATTRAGE_PREMIUM_1_2_CVT'
  },
  {
    name: 'Mitsubishi Canter Fuso',
    brand: 'MITSUBISHI',
    model: 'Canter',
    version: 'Fuso',
    code: 'X00641',
    key: 'MITSUBISHI_CANTER_FUSO'
  },
  {
    name: 'Mitsubishi Jolie MB',
    brand: 'MITSUBISHI',
    model: 'Jolie',
    version: 'MB',
    code: 'X00642',
    key: 'MITSUBISHI_JOLIE_MB'
  },
  {
    name: 'Mitsubishi Jolie SS',
    brand: 'MITSUBISHI',
    model: 'Jolie',
    version: 'SS',
    code: 'X00643',
    key: 'MITSUBISHI_JOLIE_SS'
  },
  {
    name: 'Mitsubishi Lancer Gala GLX 1.6AT',
    brand: 'MITSUBISHI',
    model: 'Lancer',
    version: 'Gala GLX 1.6AT',
    code: 'X00644',
    key: 'MITSUBISHI_LANCER_GALA_GLX_1_6AT'
  },
  {
    name: 'Mitsubishi Mirage 1.2 CVT',
    brand: 'MITSUBISHI',
    model: 'Mirage',
    version: '1.2 CVT',
    code: 'X00645',
    key: 'MITSUBISHI_MIRAGE_1_2_CVT'
  },
  {
    name: 'Mitsubishi Outlander 2.0 CVT',
    brand: 'MITSUBISHI',
    model: 'Outlander',
    version: '2.0 CVT',
    code: 'X00646',
    key: 'MITSUBISHI_OUTLANDER_2_0_CVT'
  },
  {
    name: 'Mitsubishi Outlander 2.0 CVT Premium',
    brand: 'MITSUBISHI',
    model: 'Outlander',
    version: '2.0 CVT Premium',
    code: 'X00647',
    key: 'MITSUBISHI_OUTLANDER_2_0_CVT_PREMIUM'
  },
  {
    name: 'Mitsubishi Outlander Premium 2.0 CVT',
    brand: 'MITSUBISHI',
    model: 'Outlander',
    version: 'Premium 2.0 CVT',
    code: 'X00648',
    key: 'MITSUBISHI_OUTLANDER_PREMIUM_2_0_CVT'
  },
  {
    name: 'Mitsubishi Pajero 3.0',
    brand: 'MITSUBISHI',
    model: 'Pajero',
    version: 3,
    code: 'X00649',
    key: 'MITSUBISHI_PAJERO_3_0'
  },
  {
    name: 'Mitsubishi Pajero Sport 2.4D 4x2 AT',
    brand: 'MITSUBISHI',
    model: 'Pajero',
    version: 'Sport 2.4D 4x2 AT',
    code: 'X00650',
    key: 'MITSUBISHI_PAJERO_SPORT_2_4D_4X2_AT'
  },
  {
    name: 'Mitsubishi Pajero Sport 2.4D 4x4 AT',
    brand: 'MITSUBISHI',
    model: 'Pajero',
    version: 'Sport 2.4D 4x4 AT',
    code: 'X00651',
    key: 'MITSUBISHI_PAJERO_SPORT_2_4D_4X4_AT'
  },
  {
    name: 'Mitsubishi Pajero Sport D 4x2 MT',
    brand: 'MITSUBISHI',
    model: 'Pajero',
    version: 'Sport D 4x2 MT',
    code: 'X00652',
    key: 'MITSUBISHI_PAJERO_SPORT_D_4X2_MT'
  },
  {
    name: 'Mitsubishi Pajero Sport G',
    brand: 'MITSUBISHI',
    model: 'Pajero',
    version: 'Sport G',
    code: 'X00653',
    key: 'MITSUBISHI_PAJERO_SPORT_G'
  },
  {
    name: 'Mitsubishi Pajero Sport G 4x2 AT',
    brand: 'MITSUBISHI',
    model: 'Pajero',
    version: 'Sport G 4x2 AT',
    code: 'X00654',
    key: 'MITSUBISHI_PAJERO_SPORT_G_4X2_AT'
  },
  {
    name: 'Mitsubishi Triton 4x2 AT',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: '4x2 AT',
    code: 'X00655',
    key: 'MITSUBISHI_TRITON_4X2_AT'
  },
  {
    name: 'Mitsubishi Triton 4x2 AT Mivec',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: '4x2 AT Mivec',
    code: 'X00656',
    key: 'MITSUBISHI_TRITON_4X2_AT_MIVEC'
  },
  {
    name: 'Mitsubishi Triton 4x2 AT Mivec Premium',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: '4x2 AT Mivec Premium',
    code: 'X00657',
    key: 'MITSUBISHI_TRITON_4X2_AT_MIVEC_PREMIUM'
  },
  {
    name: 'Mitsubishi Triton 4x2 MT',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: '4x2 MT',
    code: 'X00658',
    key: 'MITSUBISHI_TRITON_4X2_MT'
  },
  {
    name: 'Mitsubishi Triton 4x4 AT Mivec',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: '4x4 AT Mivec',
    code: 'X00659',
    key: 'MITSUBISHI_TRITON_4X4_AT_MIVEC'
  },
  {
    name: 'Mitsubishi Triton Athlete 4x2 AT',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: 'Athlete 4x2 AT',
    code: 'X00660',
    key: 'MITSUBISHI_TRITON_ATHLETE_4X2_AT'
  },
  {
    name: 'Mitsubishi Triton Athlete 4x2 AT Mivec',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: 'Athlete 4x2 AT Mivec',
    code: 'X00661',
    key: 'MITSUBISHI_TRITON_ATHLETE_4X2_AT_MIVEC'
  },
  {
    name: 'Mitsubishi Triton Athlete 4x4 AT',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: 'Athlete 4x4 AT',
    code: 'X00662',
    key: 'MITSUBISHI_TRITON_ATHLETE_4X4_AT'
  },
  {
    name: 'Mitsubishi Triton Athlete 4x4 AT Mivec',
    brand: 'MITSUBISHI',
    model: 'Triton',
    version: 'Athlete 4x4 AT Mivec',
    code: 'X00663',
    key: 'MITSUBISHI_TRITON_ATHLETE_4X4_AT_MIVEC'
  },
  {
    name: 'Mitsubishi Xforce Exceed',
    brand: 'MITSUBISHI',
    model: 'Xforce',
    version: 'Exceed',
    code: 'X00664',
    key: 'MITSUBISHI_XFORCE_EXCEED'
  },
  {
    name: 'Mitsubishi Xforce GLX',
    brand: 'MITSUBISHI',
    model: 'Xforce',
    version: 'GLX',
    code: 'X00665',
    key: 'MITSUBISHI_XFORCE_GLX'
  },
  {
    name: 'Mitsubishi Xforce Premium',
    brand: 'MITSUBISHI',
    model: 'Xforce',
    version: 'Premium',
    code: 'X00666',
    key: 'MITSUBISHI_XFORCE_PREMIUM'
  },
  {
    name: 'Mitsubishi Xpander 1.5 AT',
    brand: 'MITSUBISHI',
    model: 'Xpander',
    version: '1.5 AT',
    code: 'X00667',
    key: 'MITSUBISHI_XPANDER_1_5_AT'
  },
  {
    name: 'Mitsubishi Xpander 1.5 MT',
    brand: 'MITSUBISHI',
    model: 'Xpander',
    version: '1.5 MT',
    code: 'X00668',
    key: 'MITSUBISHI_XPANDER_1_5_MT'
  },
  {
    name: 'Mitsubishi Xpander Cross 1.5 AT',
    brand: 'MITSUBISHI',
    model: 'Xpander',
    version: 'Cross 1.5 AT',
    code: 'X00669',
    key: 'MITSUBISHI_XPANDER_CROSS_1_5_AT'
  },
  {
    name: 'Mitsubishi Xpander Premium 1.5 AT',
    brand: 'MITSUBISHI',
    model: 'Xpander',
    version: 'Premium 1.5 AT',
    code: 'X00670',
    key: 'MITSUBISHI_XPANDER_PREMIUM_1_5_AT'
  },
  {
    name: 'Nissan Almera EL 1.0 CVT',
    brand: 'NISSAN',
    model: 'Almera',
    version: 'EL 1.0 CVT',
    code: 'X00671',
    key: 'NISSAN_ALMERA_EL_1_0_CVT'
  },
  {
    name: 'Nissan Almera VL 1.0 CVT Cao cấp',
    brand: 'NISSAN',
    model: 'Almera',
    version: 'VL 1.0 CVT Cao cấp',
    code: 'X00672',
    key: 'NISSAN_ALMERA_VL_1_0_CVT_CAO_CAP'
  },
  {
    name: 'Nissan Navara EL 2.5 AT 2WD',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'EL 2.5 AT 2WD',
    code: 'X00673',
    key: 'NISSAN_NAVARA_EL_2_5_AT_2WD'
  },
  {
    name: 'Nissan Navara EL 2.5AT 2WD',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'EL 2.5AT 2WD',
    code: 'X00674',
    key: 'NISSAN_NAVARA_EL_2_5AT_2WD'
  },
  {
    name: 'Nissan Navara EL A-IVI 2.5 AT 2WD',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'EL A-IVI 2.5 AT 2WD',
    code: 'X00675',
    key: 'NISSAN_NAVARA_EL_A_IVI_2_5_AT_2WD'
  },
  {
    name: 'Nissan Navara EL Premium R',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'EL Premium R',
    code: 'X00676',
    key: 'NISSAN_NAVARA_EL_PREMIUM_R'
  },
  {
    name: 'Nissan Navara EL Premium Z',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'EL Premium Z',
    code: 'X00677',
    key: 'NISSAN_NAVARA_EL_PREMIUM_Z'
  },
  {
    name: 'Nissan Navara LE 2.5MT 4WD',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'LE 2.5MT 4WD',
    code: 'X00678',
    key: 'NISSAN_NAVARA_LE_2_5MT_4WD'
  },
  {
    name: 'Nissan Navara VL 2.3 AT 4WD',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'VL 2.3 AT 4WD',
    code: 'X00679',
    key: 'NISSAN_NAVARA_VL_2_3_AT_4WD'
  },
  {
    name: 'Nissan Navara VL 2.5 AT 4WD',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'VL 2.5 AT 4WD',
    code: 'X00680',
    key: 'NISSAN_NAVARA_VL_2_5_AT_4WD'
  },
  {
    name: 'Nissan Navara VL A-IVI 2.5 AT 4WD',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'VL A-IVI 2.5 AT 4WD',
    code: 'X00681',
    key: 'NISSAN_NAVARA_VL_A_IVI_2_5_AT_4WD'
  },
  {
    name: 'Nissan Navara VL Premium R',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'VL Premium R',
    code: 'X00682',
    key: 'NISSAN_NAVARA_VL_PREMIUM_R'
  },
  {
    name: 'Nissan Navara XE 2.5AT 4WD',
    brand: 'NISSAN',
    model: 'Navara',
    version: 'XE 2.5AT 4WD',
    code: 'X00683',
    key: 'NISSAN_NAVARA_XE_2_5AT_4WD'
  },
  {
    name: 'Nissan Sunny XL',
    brand: 'NISSAN',
    model: 'Sunny',
    version: 'XL',
    code: 'X00684',
    key: 'NISSAN_SUNNY_XL'
  },
  {
    name: 'Nissan Sunny XV Premium',
    brand: 'NISSAN',
    model: 'Sunny',
    version: 'XV Premium',
    code: 'X00685',
    key: 'NISSAN_SUNNY_XV_PREMIUM'
  },
  {
    name: 'Nissan Sunny XV Premium S',
    brand: 'NISSAN',
    model: 'Sunny',
    version: 'XV Premium S',
    code: 'X00686',
    key: 'NISSAN_SUNNY_XV_PREMIUM_S'
  },
  {
    name: 'Nissan Teana 2.0 AT',
    brand: 'NISSAN',
    model: 'Teana',
    version: '2.0 AT',
    code: 'X00687',
    key: 'NISSAN_TEANA_2_0_AT'
  },
  {
    name: 'Nissan Teana 2.5 SL',
    brand: 'NISSAN',
    model: 'Teana',
    version: '2.5 SL',
    code: 'X00688',
    key: 'NISSAN_TEANA_2_5_SL'
  },
  {
    name: 'Nissan Terra E 2.5 AT 2WD',
    brand: 'NISSAN',
    model: 'Terra',
    version: 'E 2.5 AT 2WD',
    code: 'X00689',
    key: 'NISSAN_TERRA_E_2_5_AT_2WD'
  },
  {
    name: 'Nissan Terra S 2.5 MT 2WD',
    brand: 'NISSAN',
    model: 'Terra',
    version: 'S 2.5 MT 2WD',
    code: 'X00690',
    key: 'NISSAN_TERRA_S_2_5_MT_2WD'
  },
  {
    name: 'Nissan Terra V 2.5 AT 4WD',
    brand: 'NISSAN',
    model: 'Terra',
    version: 'V 2.5 AT 4WD',
    code: 'X00691',
    key: 'NISSAN_TERRA_V_2_5_AT_4WD'
  },
  {
    name: 'Nissan Tiida 1.6 AT',
    brand: 'NISSAN',
    model: 'Tiida',
    version: '1.6 AT',
    code: 'X00692',
    key: 'NISSAN_TIIDA_1_6_AT'
  },
  {
    name: 'Nissan X trail 2.0 SL 2WD',
    brand: 'NISSAN',
    model: 'X',
    version: 'trail 2.0 SL 2WD',
    code: 'X00693',
    key: 'NISSAN_X_TRAIL_2_0_SL_2WD'
  },
  {
    name: 'Nissan X trail 2.0 SL 2WD Premium',
    brand: 'NISSAN',
    model: 'X',
    version: 'trail 2.0 SL 2WD Premium',
    code: 'X00694',
    key: 'NISSAN_X_TRAIL_2_0_SL_2WD_PREMIUM'
  },
  {
    name: 'Nissan X trail 2.5 SV 4WD Premium',
    brand: 'NISSAN',
    model: 'X',
    version: 'trail 2.5 SV 4WD Premium',
    code: 'X00695',
    key: 'NISSAN_X_TRAIL_2_5_SV_4WD_PREMIUM'
  },
  {
    name: 'Nissan X trail V Series 2.0 SL Luxury',
    brand: 'NISSAN',
    model: 'X',
    version: 'trail V Series 2.0 SL Luxury',
    code: 'X00696',
    key: 'NISSAN_X_TRAIL_V_SERIES_2_0_SL_LUXURY'
  },
  {
    name: 'Nissan X trail V Series 2.5 SV 4WD',
    brand: 'NISSAN',
    model: 'X',
    version: 'trail V Series 2.5 SV 4WD',
    code: 'X00697',
    key: 'NISSAN_X_TRAIL_V_SERIES_2_5_SV_4WD'
  },
  {
    name: 'Peugeot 2008 Active 1.2 AT',
    brand: 'PEUGEOT',
    model: 2008,
    version: 'Active 1.2 AT',
    code: 'X00698',
    key: 'PEUGEOT_2008_ACTIVE_1_2_AT'
  },
  {
    name: 'Peugeot 2008 GT Line 1.2 AT',
    brand: 'PEUGEOT',
    model: 2008,
    version: 'GT Line 1.2 AT',
    code: 'X00699',
    key: 'PEUGEOT_2008_GT_LINE_1_2_AT'
  },
  {
    name: 'Peugeot 3008 1.6 AT',
    brand: 'PEUGEOT',
    code: 'X00953',
    key: 'PEUGEOT_3008_1_6_AT'
  },
  {
    name: 'Peugeot 3008 AL',
    brand: 'PEUGEOT',
    model: 3008,
    version: 'AL',
    code: 'X00700',
    key: 'PEUGEOT_3008_AL'
  },
  {
    name: 'Peugeot 3008 Allure',
    brand: 'PEUGEOT',
    model: 3008,
    version: 'Allure',
    code: 'X00701',
    key: 'PEUGEOT_3008_ALLURE'
  },
  {
    name: 'Peugeot 3008 Allure 1.6 AT',
    brand: 'PEUGEOT',
    code: 'X00960',
    key: 'PEUGEOT_3008_ALLURE_1_6_AT'
  },
  {
    name: 'Peugeot 3008 GT',
    brand: 'PEUGEOT',
    model: 3008,
    version: 'GT',
    code: 'X00702',
    key: 'PEUGEOT_3008_GT'
  },
  {
    name: 'Peugeot 3008 Premium',
    brand: 'PEUGEOT',
    model: 3008,
    version: 'Premium',
    code: 'X00703',
    key: 'PEUGEOT_3008_PREMIUM'
  },
  {
    name: 'Peugeot 408 GT 1.6 AT',
    brand: 'PEUGEOT',
    model: 408,
    version: 'GT 1.6 AT',
    code: 'X00704',
    key: 'PEUGEOT_408_GT_1_6_AT'
  },
  {
    name: 'Peugeot 408 Premium',
    brand: 'PEUGEOT',
    model: 408,
    version: 'Premium',
    code: 'X00705',
    key: 'PEUGEOT_408_PREMIUM'
  },
  {
    name: 'Peugeot 408 Premium 1.6 AT',
    brand: 'PEUGEOT',
    model: 408,
    version: 'Premium 1.6 AT',
    code: 'X00706',
    key: 'PEUGEOT_408_PREMIUM_1_6_AT'
  },
  {
    name: 'Peugeot 408 Premium 2.0 AT',
    brand: 'PEUGEOT',
    model: 408,
    version: 'Premium 2.0 AT',
    code: 'X00707',
    key: 'PEUGEOT_408_PREMIUM_2_0_AT'
  },
  {
    name: 'Peugeot 5008 Active 1.6 AT',
    brand: 'PEUGEOT',
    model: 5008,
    version: 'Active 1.6 AT',
    code: 'X00708',
    key: 'PEUGEOT_5008_ACTIVE_1_6_AT'
  },
  {
    name: 'Peugeot 5008 Allure 1.6 AT',
    brand: 'PEUGEOT',
    model: 5008,
    version: 'Allure 1.6 AT',
    code: 'X00709',
    key: 'PEUGEOT_5008_ALLURE_1_6_AT'
  },
  {
    name: 'Peugeot 5008 GT 1.6 AT',
    brand: 'PEUGEOT',
    model: 5008,
    version: 'GT 1.6 AT',
    code: 'X00710',
    key: 'PEUGEOT_5008_GT_1_6_AT'
  },
  {
    name: 'Peugeot 5008 Premium',
    brand: 'PEUGEOT',
    model: 5008,
    version: 'Premium',
    code: 'X00711',
    key: 'PEUGEOT_5008_PREMIUM'
  },
  {
    name: 'Peugeot 5008 Premium 2024',
    brand: 'PEUGEOT',
    model: 5008,
    version: 'Premium 2024',
    code: 'X00712',
    key: 'PEUGEOT_5008_PREMIUM_2024'
  },
  {
    name: 'Peugeot 508 1.6 AT',
    brand: 'PEUGEOT',
    model: 508,
    version: '1.6 AT',
    code: 'X00713',
    key: 'PEUGEOT_508_1_6_AT'
  },
  {
    name: 'Peugeot Traveller Luxury',
    brand: 'PEUGEOT',
    model: 'Traveller',
    version: 'Luxury',
    code: 'X00714',
    key: 'PEUGEOT_TRAVELLER_LUXURY'
  },
  {
    name: 'Porsche 718 Boxster 2.0 AT',
    brand: 'PORSCHE',
    model: 718,
    version: 'Boxster 2.0 AT',
    code: 'X00715',
    key: 'PORSCHE_718_BOXSTER_2_0_AT'
  },
  {
    name: 'Porsche 718 Cayman',
    brand: 'PORSCHE',
    model: 718,
    version: 'Cayman',
    code: 'X00716',
    key: 'PORSCHE_718_CAYMAN'
  },
  {
    name: 'Porsche 718 Cayman 2.0 AT',
    brand: 'PORSCHE',
    model: 718,
    version: 'Cayman 2.0 AT',
    code: 'X00717',
    key: 'PORSCHE_718_CAYMAN_2_0_AT'
  },
  {
    name: 'Porsche 911 Carrera 4S',
    brand: 'PORSCHE',
    model: 911,
    version: 'Carrera 4S',
    code: 'X00718',
    key: 'PORSCHE_911_CARRERA_4S'
  },
  {
    name: 'Porsche 911 GT3',
    brand: 'PORSCHE',
    model: 911,
    version: 'GT3',
    code: 'X00719',
    key: 'PORSCHE_911_GT3'
  },
  {
    name: 'Porsche Cayenne 3.0 V6',
    brand: 'PORSCHE',
    model: 'Cayenne',
    version: '3.0 V6',
    code: 'X00720',
    key: 'PORSCHE_CAYENNE_3_0_V6'
  },
  {
    name: 'Porsche Cayenne 3.6 V6',
    brand: 'PORSCHE',
    model: 'Cayenne',
    version: '3.6 V6',
    code: 'X00721',
    key: 'PORSCHE_CAYENNE_3_6_V6'
  },
  {
    name: 'Porsche Cayenne Platinum Edition',
    brand: 'PORSCHE',
    model: 'Cayenne',
    version: 'Platinum Edition',
    code: 'X00722',
    key: 'PORSCHE_CAYENNE_PLATINUM_EDITION'
  },
  {
    name: 'Porsche Cayenne S',
    brand: 'PORSCHE',
    model: 'Cayenne',
    version: 'S',
    code: 'X00723',
    key: 'PORSCHE_CAYENNE_S'
  },
  {
    name: 'Porsche Macan 2.0',
    brand: 'PORSCHE',
    model: 'Macan',
    version: 2,
    code: 'X00724',
    key: 'PORSCHE_MACAN_2_0'
  },
  {
    name: 'Porsche Macan S',
    brand: 'PORSCHE',
    model: 'Macan',
    version: 'S',
    code: 'X00725',
    key: 'PORSCHE_MACAN_S'
  },
  {
    name: 'Porsche Panamera 2.9 V6',
    brand: 'PORSCHE',
    model: 'Panamera',
    version: '2.9 V6',
    code: 'X00726',
    key: 'PORSCHE_PANAMERA_2_9_V6'
  },
  {
    name: 'Porsche Panamera 3.0 V6',
    brand: 'PORSCHE',
    model: 'Panamera',
    version: '3.0 V6',
    code: 'X00727',
    key: 'PORSCHE_PANAMERA_3_0_V6'
  },
  {
    name: 'Porsche Panamera 3.6 V6',
    brand: 'PORSCHE',
    model: 'Panamera',
    version: '3.6 V6',
    code: 'X00728',
    key: 'PORSCHE_PANAMERA_3_6_V6'
  },
  {
    name: 'Porsche Panamera 4 Executive',
    brand: 'PORSCHE',
    model: 'Panamera',
    version: '4 Executive',
    code: 'X00729',
    key: 'PORSCHE_PANAMERA_4_EXECUTIVE'
  },
  {
    name: 'Porsche Panamera 4S',
    brand: 'PORSCHE',
    model: 'Panamera',
    version: '4S',
    code: 'X00730',
    key: 'PORSCHE_PANAMERA_4S'
  },
  {
    name: 'Renault Megane 1.6 AT',
    brand: 'RENAULT',
    model: 'Megane',
    version: '1.6 AT',
    code: 'X00731',
    key: 'RENAULT_MEGANE_1_6_AT'
  },
  {
    name: 'Rolls Royce Cullinan 6.75 V12',
    brand: 'ROLLS_ROYCE',
    model: 'Royce',
    version: 'Cullinan 6.75 V12',
    code: 'X00732',
    key: 'ROLLS_ROYCE_CULLINAN_6_75_V12'
  },
  {
    name: 'Rolls Royce Cullinan Black Badge 6.75 V12',
    brand: 'ROLLS_ROYCE',
    model: 'Royce',
    version: 'Cullinan Black Badge 6.75 V12',
    code: 'X00733',
    key: 'ROLLS_ROYCE_CULLINAN_BLACK_BADGE_6_75_V12'
  },
  {
    name: 'Rolls Royce Ghost 6.6 V12',
    brand: 'ROLLS_ROYCE',
    model: 'Royce',
    version: 'Ghost 6.6 V12',
    code: 'X00734',
    key: 'ROLLS_ROYCE_GHOST_6_6_V12'
  },
  {
    name: 'Rolls Royce Phantom EWB',
    brand: 'ROLLS_ROYCE',
    model: 'Royce',
    version: 'Phantom EWB',
    code: 'X00735',
    key: 'ROLLS_ROYCE_PHANTOM_EWB'
  },
  {
    name: 'Rolls Royce Phantom EWB 6.7 V12',
    brand: 'ROLLS_ROYCE',
    model: 'Royce',
    version: 'Phantom EWB 6.7 V12',
    code: 'X00736',
    key: 'ROLLS_ROYCE_PHANTOM_EWB_6_7_V12'
  },
  {
    name: 'Rolls Royce Wraith 6.6 V12',
    brand: 'ROLLS_ROYCE',
    model: 'Royce',
    version: 'Wraith 6.6 V12',
    code: 'X00737',
    key: 'ROLLS_ROYCE_WRAITH_6_6_V12'
  },
  {
    name: 'Skoda Karoq Style 1.4 AT',
    brand: 'SKODA',
    model: 'Karoq',
    version: 'Style 1.4 AT',
    code: 'X00738',
    key: 'SKODA_KAROQ_STYLE_1_4_AT'
  },
  {
    name: 'Skoda Kodiaq Style 2.0 AT 4WD',
    brand: 'SKODA',
    model: 'Kodiaq',
    version: 'Style 2.0 AT 4WD',
    code: 'X00739',
    key: 'SKODA_KODIAQ_STYLE_2_0_AT_4WD'
  },
  {
    name: 'Ssangyong Musso 2.9',
    brand: 'SSANGYONG',
    model: 'Musso',
    version: 2.9,
    code: 'X00740',
    key: 'SSANGYONG_MUSSO_2_9'
  },
  {
    name: 'Subaru BRZ 2.4 AT EyeSight',
    brand: 'SUBARU',
    model: 'BRZ',
    version: '2.4 AT EyeSight',
    code: 'X00741',
    key: 'SUBARU_BRZ_2_4_AT_EYESIGHT'
  },
  {
    name: 'Subaru Forester 2.0i-L',
    brand: 'SUBARU',
    model: 'Forester',
    version: '2.0i-L',
    code: 'X00742',
    key: 'SUBARU_FORESTER_2_0I_L'
  },
  {
    name: 'Subaru Forester 2.0i-L EyeSight',
    brand: 'SUBARU',
    model: 'Forester',
    version: '2.0i-L EyeSight',
    code: 'X00743',
    key: 'SUBARU_FORESTER_2_0I_L_EYESIGHT'
  },
  {
    name: 'Subaru Forester 2.0i-S EyeSight',
    brand: 'SUBARU',
    model: 'Forester',
    version: '2.0i-S EyeSight',
    code: 'X00744',
    key: 'SUBARU_FORESTER_2_0I_S_EYESIGHT'
  },
  {
    name: 'Subaru Legacy GT 2.5 AT',
    brand: 'SUBARU',
    model: 'Legacy',
    version: 'GT 2.5 AT',
    code: 'X00745',
    key: 'SUBARU_LEGACY_GT_2_5_AT'
  },
  {
    name: 'Subaru Outback 2.5i-T EyeSight',
    brand: 'SUBARU',
    model: 'Outback',
    version: '2.5i-T EyeSight',
    code: 'X00746',
    key: 'SUBARU_OUTBACK_2_5I_T_EYESIGHT'
  },
  {
    name: 'Suzuki Carry Pro',
    brand: 'SUZUKI',
    model: 'Carry',
    version: 'Pro',
    code: 'X00747',
    key: 'SUZUKI_CARRY_PRO'
  },
  {
    name: 'Suzuki Carry Pro 1.6L',
    brand: 'SUZUKI',
    model: 'Carry',
    version: 'Pro 1.6L',
    code: 'X00748',
    key: 'SUZUKI_CARRY_PRO_1_6L'
  },
  {
    name: 'Suzuki Carry Pro thùng lửng',
    brand: 'SUZUKI',
    code: 'X00962',
    key: 'SUZUKI_CARRY_PRO_THUNG_LUNG'
  },
  {
    name: 'Suzuki Ciaz 1.4 AT',
    brand: 'SUZUKI',
    model: 'Ciaz',
    version: '1.4 AT',
    code: 'X00749',
    key: 'SUZUKI_CIAZ_1_4_AT'
  },
  {
    name: 'Suzuki Ertiga Hybrid 1.5 AT',
    brand: 'SUZUKI',
    model: 'Ertiga',
    version: 'Hybrid 1.5 AT',
    code: 'X00750',
    key: 'SUZUKI_ERTIGA_HYBRID_1_5_AT'
  },
  {
    name: 'Suzuki Ertiga Limited 1.5 AT',
    brand: 'SUZUKI',
    model: 'Ertiga',
    version: 'Limited 1.5 AT',
    code: 'X00751',
    key: 'SUZUKI_ERTIGA_LIMITED_1_5_AT'
  },
  {
    name: 'Suzuki Ertiga Sport 1.5 AT',
    brand: 'SUZUKI',
    model: 'Ertiga',
    version: 'Sport 1.5 AT',
    code: 'X00752',
    key: 'SUZUKI_ERTIGA_SPORT_1_5_AT'
  },
  {
    name: 'Suzuki Jimny 1.5L 4x4 AT',
    brand: 'SUZUKI',
    code: 'X00964',
    key: 'SUZUKI_JIMNY_1_5L_4X4_AT'
  },
  {
    name: 'Suzuki Super Carry Truck 1.0 MT',
    brand: 'SUZUKI',
    model: 'Super',
    version: 'Carry Truck 1.0 MT',
    code: 'X00753',
    key: 'SUZUKI_SUPER_CARRY_TRUCK_1_0_MT'
  },
  {
    name: 'Suzuki Super Carry Van Blind Van',
    brand: 'SUZUKI',
    model: 'Super',
    version: 'Carry Van Blind Van',
    code: 'X00754',
    key: 'SUZUKI_SUPER_CARRY_VAN_BLIND_VAN'
  },
  {
    name: 'Suzuki Swift 1.4 AT',
    brand: 'SUZUKI',
    model: 'Swift',
    version: '1.4 AT',
    code: 'X00755',
    key: 'SUZUKI_SWIFT_1_4_AT'
  },
  {
    name: 'Suzuki Swift GLX 1.2 AT',
    brand: 'SUZUKI',
    model: 'Swift',
    version: 'GLX 1.2 AT',
    code: 'X00756',
    key: 'SUZUKI_SWIFT_GLX_1_2_AT'
  },
  {
    name: 'Suzuki Swift RS',
    brand: 'SUZUKI',
    model: 'Swift',
    version: 'RS',
    code: 'X00757',
    key: 'SUZUKI_SWIFT_RS'
  },
  {
    name: 'Suzuki Swift Special',
    brand: 'SUZUKI',
    model: 'Swift',
    version: 'Special',
    code: 'X00758',
    key: 'SUZUKI_SWIFT_SPECIAL'
  },
  {
    name: 'Suzuki Vitara 1.6 AT',
    brand: 'SUZUKI',
    model: 'Vitara',
    version: '1.6 AT',
    code: 'X00759',
    key: 'SUZUKI_VITARA_1_6_AT'
  },
  {
    name: 'Suzuki Vitara JLX',
    brand: 'SUZUKI',
    code: 'X00943',
    key: 'SUZUKI_VITARA_JLX'
  },
  {
    name: 'Suzuki Wagon R+ 1.0 MT',
    brand: 'SUZUKI',
    model: 'Wagon',
    version: 'R+ 1.0 MT',
    code: 'X00760',
    key: 'SUZUKI_WAGON_R_1_0_MT'
  },
  {
    name: 'Suzuki XL7 1.5 AT',
    brand: 'SUZUKI',
    model: 'XL7',
    version: '1.5 AT',
    code: 'X00761',
    key: 'SUZUKI_XL7_1_5_AT'
  },
  {
    name: 'Toyota Alphard',
    brand: 'TOYOTA',
    model: '#VALUE!',
    version: '#VALUE!',
    code: 'X00762',
    key: 'TOYOTA_ALPHARD'
  },
  {
    name: 'Toyota Alphard 2.4 AT',
    brand: 'TOYOTA',
    model: 'Alphard',
    version: '2.4 AT',
    code: 'X00763',
    key: 'TOYOTA_ALPHARD_2_4_AT'
  },
  {
    name: 'Toyota Alphard 3.5 V6',
    brand: 'TOYOTA',
    model: 'Alphard',
    version: '3.5 V6',
    code: 'X00764',
    key: 'TOYOTA_ALPHARD_3_5_V6'
  },
  {
    name: 'Toyota Alphard Executive Lounge',
    brand: 'TOYOTA',
    model: 'Alphard',
    version: 'Executive Lounge',
    code: 'X00765',
    key: 'TOYOTA_ALPHARD_EXECUTIVE_LOUNGE'
  },
  {
    name: 'Toyota Avanza 1.3 MT',
    brand: 'TOYOTA',
    model: 'Avanza',
    version: '1.3 MT',
    code: 'X00766',
    key: 'TOYOTA_AVANZA_1_3_MT'
  },
  {
    name: 'Toyota Avanza Premio 1.5 AT',
    brand: 'TOYOTA',
    model: 'Avanza',
    version: 'Premio 1.5 AT',
    code: 'X00767',
    key: 'TOYOTA_AVANZA_PREMIO_1_5_AT'
  },
  {
    name: 'Toyota Avanza Premio 1.5 MT',
    brand: 'TOYOTA',
    model: 'Avanza',
    version: 'Premio 1.5 MT',
    code: 'X00768',
    key: 'TOYOTA_AVANZA_PREMIO_1_5_MT'
  },
  {
    name: 'Toyota Aygo 1.0 AT',
    brand: 'TOYOTA',
    model: 'Aygo',
    version: '1.0 AT',
    code: 'X00769',
    key: 'TOYOTA_AYGO_1_0_AT'
  },
  {
    name: 'Toyota Camry 2.0E',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.0E',
    code: 'X00770',
    key: 'TOYOTA_CAMRY_2_0E'
  },
  {
    name: 'Toyota Camry 2.0G',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.0G',
    code: 'X00771',
    key: 'TOYOTA_CAMRY_2_0G'
  },
  {
    name: 'Toyota Camry 2.0Q',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.0Q',
    code: 'X00772',
    key: 'TOYOTA_CAMRY_2_0Q'
  },
  {
    name: 'Toyota Camry 2.4G',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.4G',
    code: 'X00773',
    key: 'TOYOTA_CAMRY_2_4G'
  },
  {
    name: 'Toyota Camry 2.5G',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.5G',
    code: 'X00774',
    key: 'TOYOTA_CAMRY_2_5G'
  },
  {
    name: 'Toyota Camry 2.5HV',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.5HV',
    code: 'X00775',
    key: 'TOYOTA_CAMRY_2_5HV'
  },
  {
    name: 'Toyota Camry 2.5Q',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.5Q',
    code: 'X00776',
    key: 'TOYOTA_CAMRY_2_5Q'
  },
  {
    name: 'Toyota Camry 2.5Q 2.5 AT',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.5Q 2.5 AT',
    code: 'X00777',
    key: 'TOYOTA_CAMRY_2_5Q_2_5_AT'
  },
  {
    name: 'Toyota Camry 2.5Q AT',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '2.5Q AT',
    code: 'X00778',
    key: 'TOYOTA_CAMRY_2_5Q_AT'
  },
  {
    name: 'Toyota Camry 3.0V',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '3.0V',
    code: 'X00779',
    key: 'TOYOTA_CAMRY_3_0V'
  },
  {
    name: 'Toyota Camry 3.5Q',
    brand: 'TOYOTA',
    model: 'Camry',
    version: '3.5Q',
    code: 'X00780',
    key: 'TOYOTA_CAMRY_3_5Q'
  },
  {
    name: 'Toyota Camry GLi 2.2',
    brand: 'TOYOTA',
    model: 'Camry',
    version: 'GLi 2.2',
    code: 'X00781',
    key: 'TOYOTA_CAMRY_GLI_2_2'
  },
  {
    name: 'Toyota Camry LE 2.4',
    brand: 'TOYOTA',
    model: 'Camry',
    version: 'LE 2.4',
    code: 'X00782',
    key: 'TOYOTA_CAMRY_LE_2_4'
  },
  {
    name: 'Toyota Camry LE 2.5',
    brand: 'TOYOTA',
    model: 'Camry',
    version: 'LE 2.5',
    code: 'X00783',
    key: 'TOYOTA_CAMRY_LE_2_5'
  },
  {
    name: 'Toyota Camry LE AT',
    brand: 'TOYOTA',
    model: 'Camry',
    version: 'LE AT',
    code: 'X00784',
    key: 'TOYOTA_CAMRY_LE_AT'
  },
  {
    name: 'Toyota Camry SE 2.5 AT',
    brand: 'TOYOTA',
    model: 'Camry',
    version: 'SE 2.5 AT',
    code: 'X00785',
    key: 'TOYOTA_CAMRY_SE_2_5_AT'
  },
  {
    name: 'Toyota Corolla altis',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'altis',
    code: 'X00786',
    key: 'TOYOTA_COROLLA_ALTIS'
  },
  {
    name: 'Toyota Corolla altis 1.8E AT',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'altis 1.8E AT',
    code: 'X00787',
    key: 'TOYOTA_COROLLA_ALTIS_1_8E_AT'
  },
  {
    name: 'Toyota Corolla altis 1.8E MT',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'altis 1.8E MT',
    code: 'X00788',
    key: 'TOYOTA_COROLLA_ALTIS_1_8E_MT'
  },
  {
    name: 'Toyota Corolla Altis 1.8G AT',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'Altis 1.8G AT',
    code: 'X00789',
    key: 'TOYOTA_COROLLA_ALTIS_1_8G_AT'
  },
  {
    name: 'Toyota Corolla altis 1.8G MT',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'altis 1.8G MT',
    code: 'X00790',
    key: 'TOYOTA_COROLLA_ALTIS_1_8G_MT'
  },
  {
    name: 'Toyota Corolla altis 1.8HEV',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'altis 1.8HEV',
    code: 'X00791',
    key: 'TOYOTA_COROLLA_ALTIS_1_8HEV'
  },
  {
    name: 'Toyota Corolla altis 1.8V',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'altis 1.8V',
    code: 'X00792',
    key: 'TOYOTA_COROLLA_ALTIS_1_8V'
  },
  {
    name: 'Toyota Corolla altis 2.0V',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'altis 2.0V',
    code: 'X00793',
    key: 'TOYOTA_COROLLA_ALTIS_2_0V'
  },
  {
    name: 'Toyota Corolla Cross',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'Cross',
    code: 'X00794',
    key: 'TOYOTA_COROLLA_CROSS'
  },
  {
    name: 'Toyota Corolla Cross 1.8G',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'Cross 1.8G',
    code: 'X00795',
    key: 'TOYOTA_COROLLA_CROSS_1_8G'
  },
  {
    name: 'Toyota Corolla Cross 1.8HEV',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'Cross 1.8HEV',
    code: 'X00796',
    key: 'TOYOTA_COROLLA_CROSS_1_8HEV'
  },
  {
    name: 'Toyota Corolla Cross 1.8HV',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'Cross 1.8HV',
    code: 'X00797',
    key: 'TOYOTA_COROLLA_CROSS_1_8HV'
  },
  {
    name: 'Toyota Corolla Cross 1.8V',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'Cross 1.8V',
    code: 'X00798',
    key: 'TOYOTA_COROLLA_CROSS_1_8V'
  },
  {
    name: 'Toyota Corolla Cross 1.8V 1.8 AT',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'Cross 1.8V 1.8 AT',
    code: 'X00799',
    key: 'TOYOTA_COROLLA_CROSS_1_8V_1_8_AT'
  },
  {
    name: 'Toyota Corolla GLi 1.6 MT',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'GLi 1.6 MT',
    code: 'X00800',
    key: 'TOYOTA_COROLLA_GLI_1_6_MT'
  },
  {
    name: 'Toyota Corolla GLi 1.8 AT',
    brand: 'TOYOTA',
    code: 'X00966',
    key: 'TOYOTA_COROLLA_GLI_1_8_AT'
  },
  {
    name: 'Toyota Corolla J 1.3 MT',
    brand: 'TOYOTA',
    model: 'Corolla',
    version: 'J 1.3 MT',
    code: 'X00801',
    key: 'TOYOTA_COROLLA_J_1_3_MT'
  },
  {
    name: 'Toyota Corona Deluxe 1.6',
    brand: 'TOYOTA',
    model: 'Corona',
    version: 'Deluxe 1.6',
    code: 'X00802',
    key: 'TOYOTA_CORONA_DELUXE_1_6'
  },
  {
    name: 'Toyota Crown 2.2 MT',
    brand: 'TOYOTA',
    model: 'Crown',
    version: '2.2 MT',
    code: 'X00803',
    key: 'TOYOTA_CROWN_2_2_MT'
  },
  {
    name: 'Toyota Crown Royal Saloon 3.0 AT',
    brand: 'TOYOTA',
    model: 'Crown',
    version: 'Royal Saloon 3.0 AT',
    code: 'X00804',
    key: 'TOYOTA_CROWN_ROYAL_SALOON_3_0_AT'
  },
  {
    name: 'Toyota Crown Super Saloon 3.0 MT',
    brand: 'TOYOTA',
    model: 'Crown',
    version: 'Super Saloon 3.0 MT',
    code: 'X00805',
    key: 'TOYOTA_CROWN_SUPER_SALOON_3_0_MT'
  },
  {
    name: 'Toyota Fortuner',
    brand: 'TOYOTA',
    model: '#VALUE!',
    version: '#VALUE!',
    code: 'X00806',
    key: 'TOYOTA_FORTUNER'
  },
  {
    name: 'Toyota Fortuner 2.4G 4x2 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.4G 4x2 AT',
    code: 'X00807',
    key: 'TOYOTA_FORTUNER_2_4G_4X2_AT'
  },
  {
    name: 'Toyota Fortuner 2.4G 4x2 AT Legender',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.4G 4x2 AT Legender',
    code: 'X00808',
    key: 'TOYOTA_FORTUNER_2_4G_4X2_AT_LEGENDER'
  },
  {
    name: 'Toyota Fortuner 2.4G 4x2 MT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.4G 4x2 MT',
    code: 'X00809',
    key: 'TOYOTA_FORTUNER_2_4G_4X2_MT'
  },
  {
    name: 'Toyota Fortuner 2.4L 4x2 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.4L 4x2 AT',
    code: 'X00810',
    key: 'TOYOTA_FORTUNER_2_4L_4X2_AT'
  },
  {
    name: 'Toyota Fortuner 2.4L 4x2 MT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.4L 4x2 MT',
    code: 'X00811',
    key: 'TOYOTA_FORTUNER_2_4L_4X2_MT'
  },
  {
    name: 'Toyota Fortuner 2.5G',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.5G',
    code: 'X00812',
    key: 'TOYOTA_FORTUNER_2_5G'
  },
  {
    name: 'Toyota Fortuner 2.7L 4x2 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.7L 4x2 AT',
    code: 'X00813',
    key: 'TOYOTA_FORTUNER_2_7L_4X2_AT'
  },
  {
    name: 'Toyota Fortuner 2.7V 4X2 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.7V 4X2 AT',
    code: 'X00814',
    key: 'TOYOTA_FORTUNER_2_7V_4X2_AT'
  },
  {
    name: 'Toyota Fortuner 2.7V 4x4 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: '2.7V 4x4 AT',
    code: 'X00815',
    key: 'TOYOTA_FORTUNER_2_7V_4X4_AT'
  },
  {
    name: 'Toyota Fortuner 2.8V 4x4 AT',
    brand: 'TOYOTA',
    code: 'X00968',
    key: 'TOYOTA_FORTUNER_2_8V_4X4_AT'
  },
  {
    name: 'Toyota Fortuner Legender 2.4L 4x2 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: 'Legender 2.4L 4x2 AT',
    code: 'X00816',
    key: 'TOYOTA_FORTUNER_LEGENDER_2_4L_4X2_AT'
  },
  {
    name: 'Toyota Fortuner Legender 2.8L 4x4 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: 'Legender 2.8L 4x4 AT',
    code: 'X00817',
    key: 'TOYOTA_FORTUNER_LEGENDER_2_8L_4X4_AT'
  },
  {
    name: 'Toyota Fortuner SR5 2.7 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: 'SR5 2.7 AT',
    code: 'X00818',
    key: 'TOYOTA_FORTUNER_SR5_2_7_AT'
  },
  {
    name: 'Toyota Fortuner TRD Sportivo 4x2 AT',
    brand: 'TOYOTA',
    model: 'Fortuner',
    version: 'TRD Sportivo 4x2 AT',
    code: 'X00819',
    key: 'TOYOTA_FORTUNER_TRD_SPORTIVO_4X2_AT'
  },
  {
    name: 'Toyota Hiace 2.0',
    brand: 'TOYOTA',
    model: 'Hiace',
    version: 2,
    code: 'X00820',
    key: 'TOYOTA_HIACE_2_0'
  },
  {
    name: 'Toyota Hiace 2.7',
    brand: 'TOYOTA',
    model: 'Hiace',
    version: 2.7,
    code: 'X00821',
    key: 'TOYOTA_HIACE_2_7'
  },
  {
    name: 'Toyota Hiace Van 2.5',
    brand: 'TOYOTA',
    model: 'Hiace',
    version: 'Van 2.5',
    code: 'X00822',
    key: 'TOYOTA_HIACE_VAN_2_5'
  },
  {
    name: 'Toyota Hiace VAN 6 chỗ 850kg',
    brand: 'TOYOTA',
    model: 'Hiace',
    version: 'VAN 6 chỗ 850kg',
    code: 'X00823',
    key: 'TOYOTA_HIACE_VAN_6_CHO_850KG'
  },
  {
    name: 'Toyota Highlander Limited Hybrid 2.5 AWD',
    brand: 'TOYOTA',
    model: 'Highlander',
    version: 'Limited Hybrid 2.5 AWD',
    code: 'X00824',
    key: 'TOYOTA_HIGHLANDER_LIMITED_HYBRID_2_5_AWD'
  },
  {
    name: 'Toyota Hilux 2.4E 4x2 AT',
    brand: 'TOYOTA',
    model: 'Hilux',
    version: '2.4E 4x2 AT',
    code: 'X00825',
    key: 'TOYOTA_HILUX_2_4E_4X2_AT'
  },
  {
    name: 'Toyota Hilux 2.4L 4x2 AT',
    brand: 'TOYOTA',
    model: 'Hilux',
    version: '2.4L 4x2 AT',
    code: 'X00826',
    key: 'TOYOTA_HILUX_2_4L_4X2_AT'
  },
  {
    name: 'Toyota Hilux 2.8G 4x4 AT',
    brand: 'TOYOTA',
    model: 'Hilux',
    version: '2.8G 4x4 AT',
    code: 'X00827',
    key: 'TOYOTA_HILUX_2_8G_4X4_AT'
  },
  {
    name: 'Toyota Hilux 2.8L 4x4 AT',
    brand: 'TOYOTA',
    model: 'Hilux',
    version: '2.8L 4x4 AT',
    code: 'X00828',
    key: 'TOYOTA_HILUX_2_8L_4X4_AT'
  },
  {
    name: 'Toyota Hilux 3.0G 4x4 MT',
    brand: 'TOYOTA',
    model: 'Hilux',
    version: '3.0G 4x4 MT',
    code: 'X00829',
    key: 'TOYOTA_HILUX_3_0G_4X4_MT'
  },
  {
    name: 'Toyota Innova 2.0 Venturer',
    brand: 'TOYOTA',
    model: 'Innova',
    version: '2.0 Venturer',
    code: 'X00830',
    key: 'TOYOTA_INNOVA_2_0_VENTURER'
  },
  {
    name: 'Toyota Innova 2.0E',
    brand: 'TOYOTA',
    model: 'Innova',
    version: '2.0E',
    code: 'X00831',
    key: 'TOYOTA_INNOVA_2_0E'
  },
  {
    name: 'Toyota Innova 2.0G',
    brand: 'TOYOTA',
    model: 'Innova',
    version: '2.0G',
    code: 'X00832',
    key: 'TOYOTA_INNOVA_2_0G'
  },
  {
    name: 'Toyota Innova 2.0V',
    brand: 'TOYOTA',
    model: 'Innova',
    version: '2.0V',
    code: 'X00833',
    key: 'TOYOTA_INNOVA_2_0V'
  },
  {
    name: 'Toyota Innova Cross 2.0 CVT',
    brand: 'TOYOTA',
    model: 'Innova',
    version: 'Cross 2.0 CVT',
    code: 'X00834',
    key: 'TOYOTA_INNOVA_CROSS_2_0_CVT'
  },
  {
    name: 'Toyota Innova Cross HEV 2.0 CVT',
    brand: 'TOYOTA',
    model: 'Innova',
    version: 'Cross HEV 2.0 CVT',
    code: 'X00835',
    key: 'TOYOTA_INNOVA_CROSS_HEV_2_0_CVT'
  },
  {
    name: 'Toyota Innova E 2.0 MT',
    brand: 'TOYOTA',
    model: 'Innova',
    version: 'E 2.0 MT',
    code: 'X00836',
    key: 'TOYOTA_INNOVA_E_2_0_MT'
  },
  {
    name: 'Toyota Innova G',
    brand: 'TOYOTA',
    model: 'Innova',
    version: 'G',
    code: 'X00837',
    key: 'TOYOTA_INNOVA_G'
  },
  {
    name: 'Toyota Innova J',
    brand: 'TOYOTA',
    model: 'Innova',
    version: 'J',
    code: 'X00838',
    key: 'TOYOTA_INNOVA_J'
  },
  {
    name: 'Toyota Innova V',
    brand: 'TOYOTA',
    model: 'Innova',
    version: 'V',
    code: 'X00839',
    key: 'TOYOTA_INNOVA_V'
  },
  {
    name: 'Toyota Innova V 2.0 AT',
    brand: 'TOYOTA',
    model: 'Innova',
    version: 'V 2.0 AT',
    code: 'X00840',
    key: 'TOYOTA_INNOVA_V_2_0_AT'
  },
  {
    name: 'Toyota Innova Venturer 2.0 AT',
    brand: 'TOYOTA',
    model: 'Innova',
    version: 'Venturer 2.0 AT',
    code: 'X00841',
    key: 'TOYOTA_INNOVA_VENTURER_2_0_AT'
  },
  {
    name: 'Toyota Land Cruiser 3.5 V6',
    brand: 'TOYOTA',
    model: 'Land',
    version: 'Cruiser 3.5 V6',
    code: 'X00842',
    key: 'TOYOTA_LAND_CRUISER_3_5_V6'
  },
  {
    name: 'Toyota Land Cruiser 4.6 V8',
    brand: 'TOYOTA',
    model: 'Land',
    version: 'Cruiser 4.6 V8',
    code: 'X00843',
    key: 'TOYOTA_LAND_CRUISER_4_6_V8'
  },
  {
    name: 'Toyota Land Cruiser 5.7 V8',
    brand: 'TOYOTA',
    model: 'Land',
    version: 'Cruiser 5.7 V8',
    code: 'X00844',
    key: 'TOYOTA_LAND_CRUISER_5_7_V8'
  },
  {
    name: 'Toyota Land Cruiser BJ70 4.0 MT',
    brand: 'TOYOTA',
    model: 'Land',
    version: 'Cruiser BJ70 4.0 MT',
    code: 'X00845',
    key: 'TOYOTA_LAND_CRUISER_BJ70_4_0_MT'
  },
  {
    name: 'Toyota Land Cruiser GX 4.5',
    brand: 'TOYOTA',
    model: 'Land',
    version: 'Cruiser GX 4.5',
    code: 'X00846',
    key: 'TOYOTA_LAND_CRUISER_GX_4_5'
  },
  {
    name: 'Toyota Land Cruiser VX 4.6 V8',
    brand: 'TOYOTA',
    model: 'Land',
    version: 'Cruiser VX 4.6 V8',
    code: 'X00847',
    key: 'TOYOTA_LAND_CRUISER_VX_4_6_V8'
  },
  {
    name: 'Toyota Land Cruiser VXR 3.5 V6',
    brand: 'TOYOTA',
    model: 'Land',
    version: 'Cruiser VXR 3.5 V6',
    code: 'X00848',
    key: 'TOYOTA_LAND_CRUISER_VXR_3_5_V6'
  },
  {
    name: 'Toyota Prado GX 2.7 AT',
    brand: 'TOYOTA',
    model: 'Prado',
    version: 'GX 2.7 AT',
    code: 'X00849',
    key: 'TOYOTA_PRADO_GX_2_7_AT'
  },
  {
    name: 'Toyota Prado TXL 2.7L',
    brand: 'TOYOTA',
    model: 'Prado',
    version: 'TXL 2.7L',
    code: 'X00850',
    key: 'TOYOTA_PRADO_TXL_2_7L'
  },
  {
    name: 'Toyota Prado VX',
    brand: 'TOYOTA',
    model: 'Prado',
    version: 'VX',
    code: 'X00851',
    key: 'TOYOTA_PRADO_VX'
  },
  {
    name: 'Toyota Prado VX 2.7L',
    brand: 'TOYOTA',
    model: 'Prado',
    version: 'VX 2.7L',
    code: 'X00852',
    key: 'TOYOTA_PRADO_VX_2_7L'
  },
  {
    name: 'Toyota Prado VX 4.0 AT',
    brand: 'TOYOTA',
    model: 'Prado',
    version: 'VX 4.0 AT',
    code: 'X00853',
    key: 'TOYOTA_PRADO_VX_4_0_AT'
  },
  {
    name: 'Toyota Raize G',
    brand: 'TOYOTA',
    model: 'Raize',
    version: 'G',
    code: 'X00854',
    key: 'TOYOTA_RAIZE_G'
  },
  {
    name: 'Toyota Raize G 1.0 CVT',
    brand: 'TOYOTA',
    model: 'Raize',
    version: 'G 1.0 CVT',
    code: 'X00855',
    key: 'TOYOTA_RAIZE_G_1_0_CVT'
  },
  {
    name: 'Toyota RAV4 Limited 2.4 AT',
    brand: 'TOYOTA',
    model: 'RAV4',
    version: 'Limited 2.4 AT',
    code: 'X00856',
    key: 'TOYOTA_RAV4_LIMITED_2_4_AT'
  },
  {
    name: 'Toyota Rush',
    brand: 'TOYOTA',
    code: 'X00973',
    key: 'TOYOTA_RUSH'
  },
  {
    name: 'Toyota Rush 1.5S AT',
    brand: 'TOYOTA',
    model: 'Rush',
    version: '1.5S AT',
    code: 'X00857',
    key: 'TOYOTA_RUSH_1_5S_AT'
  },
  {
    name: 'Toyota Sienna LE 2.7',
    brand: 'TOYOTA',
    model: 'Sienna',
    version: 'LE 2.7',
    code: 'X00858',
    key: 'TOYOTA_SIENNA_LE_2_7'
  },
  {
    name: 'Toyota Sienna Limited 3.5',
    brand: 'TOYOTA',
    model: 'Sienna',
    version: 'Limited 3.5',
    code: 'X00859',
    key: 'TOYOTA_SIENNA_LIMITED_3_5'
  },
  {
    name: 'Toyota Sienna Limited 3.5 AWD',
    brand: 'TOYOTA',
    model: 'Sienna',
    version: 'Limited 3.5 AWD',
    code: 'X00860',
    key: 'TOYOTA_SIENNA_LIMITED_3_5_AWD'
  },
  {
    name: 'Toyota Sienna Platinum 2.5 AT',
    brand: 'TOYOTA',
    model: 'Sienna',
    version: 'Platinum 2.5 AT',
    code: 'X00861',
    key: 'TOYOTA_SIENNA_PLATINUM_2_5_AT'
  },
  {
    name: 'Toyota Sienna Platinum 2.5 AT AWD',
    brand: 'TOYOTA',
    model: 'Sienna',
    version: 'Platinum 2.5 AT AWD',
    code: 'X00862',
    key: 'TOYOTA_SIENNA_PLATINUM_2_5_AT_AWD'
  },
  {
    name: 'Toyota Veloz Cross 1.5 CVT',
    brand: 'TOYOTA',
    model: 'Veloz',
    version: 'Cross 1.5 CVT',
    code: 'X00863',
    key: 'TOYOTA_VELOZ_CROSS_1_5_CVT'
  },
  {
    name: 'Toyota Veloz Cross Top 1.5 CVT',
    brand: 'TOYOTA',
    model: 'Veloz',
    version: 'Cross Top 1.5 CVT',
    code: 'X00864',
    key: 'TOYOTA_VELOZ_CROSS_TOP_1_5_CVT'
  },
  {
    name: 'Toyota Venza 2.7',
    brand: 'TOYOTA',
    model: 'Venza',
    version: 2.7,
    code: 'X00865',
    key: 'TOYOTA_VENZA_2_7'
  },
  {
    name: 'Toyota Venza 2.7 AWD',
    brand: 'TOYOTA',
    model: 'Venza',
    version: '2.7 AWD',
    code: 'X00866',
    key: 'TOYOTA_VENZA_2_7_AWD'
  },
  {
    name: 'Toyota Venza 3.5 AWD',
    brand: 'TOYOTA',
    model: 'Venza',
    version: '3.5 AWD',
    code: 'X00867',
    key: 'TOYOTA_VENZA_3_5_AWD'
  },
  {
    name: 'Toyota Vios 1.5 CVT',
    brand: 'TOYOTA',
    model: 'Vios',
    version: '1.5 CVT',
    code: 'X00868',
    key: 'TOYOTA_VIOS_1_5_CVT'
  },
  {
    name: 'Toyota Vios 1.5E',
    brand: 'TOYOTA',
    model: 'Vios',
    version: '1.5E',
    code: 'X00869',
    key: 'TOYOTA_VIOS_1_5E'
  },
  {
    name: 'Toyota Vios 1.5E CVT',
    brand: 'TOYOTA',
    model: 'Vios',
    version: '1.5E CVT',
    code: 'X00870',
    key: 'TOYOTA_VIOS_1_5E_CVT'
  },
  {
    name: 'Toyota Vios 1.5E MT',
    brand: 'TOYOTA',
    model: 'Vios',
    version: '1.5E MT',
    code: 'X00871',
    key: 'TOYOTA_VIOS_1_5E_MT'
  },
  {
    name: 'Toyota Vios 1.5G',
    brand: 'TOYOTA',
    model: 'Vios',
    version: '1.5G',
    code: 'X00872',
    key: 'TOYOTA_VIOS_1_5G'
  },
  {
    name: 'Toyota Vios E 1.5 MT',
    brand: 'TOYOTA',
    model: 'Vios',
    version: 'E 1.5 MT',
    code: 'X00873',
    key: 'TOYOTA_VIOS_E_1_5_MT'
  },
  {
    name: 'Toyota Vios E CVT',
    brand: 'TOYOTA',
    model: 'Vios',
    version: 'E CVT',
    code: 'X00874',
    key: 'TOYOTA_VIOS_E_CVT'
  },
  {
    name: 'Toyota Vios E CVT 1.5 AT',
    brand: 'TOYOTA',
    model: 'Vios',
    version: 'E CVT 1.5 AT',
    code: 'X00875',
    key: 'TOYOTA_VIOS_E_CVT_1_5_AT'
  },
  {
    name: 'Toyota Vios G 1.5 CVT',
    brand: 'TOYOTA',
    model: 'Vios',
    version: 'G 1.5 CVT',
    code: 'X00876',
    key: 'TOYOTA_VIOS_G_1_5_CVT'
  },
  {
    name: 'Toyota Wigo 1.2 AT',
    brand: 'TOYOTA',
    model: 'Wigo',
    version: '1.2 AT',
    code: 'X00877',
    key: 'TOYOTA_WIGO_1_2_AT'
  },
  {
    name: 'Toyota Wigo E 1.2 MT',
    brand: 'TOYOTA',
    model: 'Wigo',
    version: 'E 1.2 MT',
    code: 'X00878',
    key: 'TOYOTA_WIGO_E_1_2_MT'
  },
  {
    name: 'Toyota Wigo G 1.2 AT',
    brand: 'TOYOTA',
    model: 'Wigo',
    version: 'G 1.2 AT',
    code: 'X00879',
    key: 'TOYOTA_WIGO_G_1_2_AT'
  },
  {
    name: 'Toyota Yaris 1.3 AT',
    brand: 'TOYOTA',
    model: 'Yaris',
    version: '1.3 AT',
    code: 'X00880',
    key: 'TOYOTA_YARIS_1_3_AT'
  },
  {
    name: 'Toyota Yaris 1.3G',
    brand: 'TOYOTA',
    model: 'Yaris',
    version: '1.3G',
    code: 'X00881',
    key: 'TOYOTA_YARIS_1_3G'
  },
  {
    name: 'Toyota Yaris 1.5G',
    brand: 'TOYOTA',
    model: 'Yaris',
    version: '1.5G',
    code: 'X00882',
    key: 'TOYOTA_YARIS_1_5G'
  },
  {
    name: 'Toyota Yaris Cross 1.5 D-CVT',
    brand: 'TOYOTA',
    model: 'Yaris',
    version: 'Cross 1.5 D-CVT',
    code: 'X00883',
    key: 'TOYOTA_YARIS_CROSS_1_5_D_CVT'
  },
  {
    name: 'Toyota Yaris Cross HEV 1.5 CVT',
    brand: 'TOYOTA',
    model: 'Yaris',
    version: 'Cross HEV 1.5 CVT',
    code: 'X00884',
    key: 'TOYOTA_YARIS_CROSS_HEV_1_5_CVT'
  },
  {
    name: 'Toyota Yaris G 1.5 AT',
    brand: 'TOYOTA',
    model: 'Yaris',
    version: 'G 1.5 AT',
    code: 'X00885',
    key: 'TOYOTA_YARIS_G_1_5_AT'
  },
  {
    name: 'Toyota Zace GL',
    brand: 'TOYOTA',
    model: 'Zace',
    version: 'GL',
    code: 'X00886',
    key: 'TOYOTA_ZACE_GL'
  },
  {
    name: 'VinFast Fadil 1.4 AT',
    brand: 'VINFAST',
    model: 'Fadil',
    version: '1.4 AT',
    code: 'X00887',
    key: 'VINFAST_FADIL_1_4_AT'
  },
  {
    name: 'VinFast Fadil 1.4 AT Plus',
    brand: 'VINFAST',
    model: 'Fadil',
    version: '1.4 AT Plus',
    code: 'X00888',
    key: 'VINFAST_FADIL_1_4_AT_PLUS'
  },
  {
    name: 'VinFast Fadil Cao cấp 1.4 AT',
    brand: 'VINFAST',
    code: 'X00952',
    key: 'VINFAST_FADIL_CAO_CAP_1_4_AT'
  },
  {
    name: 'VinFast Fadil Tiêu chuẩn 1.4 AT',
    brand: 'VINFAST',
    model: 'Fadil',
    version: 'Tiêu chuẩn 1.4 AT',
    code: 'X00889',
    key: 'VINFAST_FADIL_TIEU_CHUAN_1_4_AT'
  },
  {
    name: 'VinFast Lux A 2.0',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0',
    code: 'X00890',
    key: 'VINFAST_LUX_A_2_0'
  },
  {
    name: 'VinFast Lux A 2.0 2.0 AT',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0 2.0 AT',
    code: 'X00891',
    key: 'VINFAST_LUX_A_2_0_2_0_AT'
  },
  {
    name: 'VinFast Lux A 2.0 AT',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0 AT',
    code: 'X00892',
    key: 'VINFAST_LUX_A_2_0_AT'
  },
  {
    name: 'VinFast Lux A 2.0 Cao cấp',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0 Cao cấp',
    code: 'X00893',
    key: 'VINFAST_LUX_A_2_0_CAO_CAP'
  },
  {
    name: 'VinFast Lux A 2.0 Nâng cao',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0 Nâng cao',
    code: 'X00894',
    key: 'VINFAST_LUX_A_2_0_NANG_CAO'
  },
  {
    name: 'VinFast Lux A 2.0 Plus 2.0 AT',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0 Plus 2.0 AT',
    code: 'X00895',
    key: 'VINFAST_LUX_A_2_0_PLUS_2_0_AT'
  },
  {
    name: 'VinFast Lux A 2.0 Premium',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0 Premium',
    code: 'X00896',
    key: 'VINFAST_LUX_A_2_0_PREMIUM'
  },
  {
    name: 'VinFast Lux A 2.0 Premium 2.0 AT',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0 Premium 2.0 AT',
    code: 'X00897',
    key: 'VINFAST_LUX_A_2_0_PREMIUM_2_0_AT'
  },
  {
    name: 'VinFast Lux A 2.0 Tiêu chuẩn',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'A 2.0 Tiêu chuẩn',
    code: 'X00898',
    key: 'VINFAST_LUX_A_2_0_TIEU_CHUAN'
  },
  {
    name: 'VinFast Lux SA 2.0 2.0 AT',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'SA 2.0 2.0 AT',
    code: 'X00899',
    key: 'VINFAST_LUX_SA_2_0_2_0_AT'
  },
  {
    name: 'VinFast Lux SA 2.0 AT',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'SA 2.0 AT',
    code: 'X00900',
    key: 'VINFAST_LUX_SA_2_0_AT'
  },
  {
    name: 'VinFast Lux SA 2.0 Cao cấp',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'SA 2.0 Cao cấp',
    code: 'X00901',
    key: 'VINFAST_LUX_SA_2_0_CAO_CAP'
  },
  {
    name: 'VinFast Lux SA 2.0 Plus 2.0 AT',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'SA 2.0 Plus 2.0 AT',
    code: 'X00902',
    key: 'VINFAST_LUX_SA_2_0_PLUS_2_0_AT'
  },
  {
    name: 'VinFast Lux SA 2.0 Premium 2.0 AT',
    brand: 'VINFAST',
    model: 'Lux',
    version: 'SA 2.0 Premium 2.0 AT',
    code: 'X00903',
    key: 'VINFAST_LUX_SA_2_0_PREMIUM_2_0_AT'
  },
  {
    name: 'VinFast President 6.2 V8',
    brand: 'VINFAST',
    model: 'President',
    version: '6.2 V8',
    code: 'X00904',
    key: 'VINFAST_PRESIDENT_6_2_V8'
  },
  {
    name: 'VinFast VF e34 AT',
    brand: 'VINFAST',
    model: 'VF',
    version: 'e34 AT',
    code: 'X00905',
    key: 'VINFAST_VF_E34_AT'
  },
  {
    name: 'VinFast VF3 Plus',
    brand: 'VINFAST',
    model: 'VF3',
    version: 'Plus',
    code: 'X00906',
    key: 'VINFAST_VF3_PLUS'
  },
  {
    name: 'VinFast VF5 Plus',
    brand: 'VINFAST',
    model: 'VF5',
    version: 'Plus',
    code: 'X00907',
    key: 'VINFAST_VF5_PLUS'
  },
  {
    name: 'VinFast VF6 Base',
    brand: 'VINFAST',
    model: 'VF6',
    version: 'Base',
    code: 'X00908',
    key: 'VINFAST_VF6_BASE'
  },
  {
    name: 'VinFast VF6 Plus',
    brand: 'VINFAST',
    model: 'VF6',
    version: 'Plus',
    code: 'X00909',
    key: 'VINFAST_VF6_PLUS'
  },
  {
    name: 'VinFast VF7 Eco',
    brand: 'VINFAST',
    model: 'VF7',
    version: 'Eco',
    code: 'X00910',
    key: 'VINFAST_VF7_ECO'
  },
  {
    name: 'VinFast VF7 Plus',
    brand: 'VINFAST',
    model: 'VF7',
    version: 'Plus',
    code: 'X00911',
    key: 'VINFAST_VF7_PLUS'
  },
  {
    name: 'VinFast VF8 Eco',
    brand: 'VINFAST',
    model: 'VF8',
    version: 'Eco',
    code: 'X00912',
    key: 'VINFAST_VF8_ECO'
  },
  {
    name: 'VinFast VF8 Plus',
    brand: 'VINFAST',
    model: 'VF8',
    version: 'Plus',
    code: 'X00913',
    key: 'VINFAST_VF8_PLUS'
  },
  {
    name: 'VinFast VF9 Eco',
    brand: 'VINFAST',
    model: 'VF9',
    version: 'Eco',
    code: 'X00914',
    key: 'VINFAST_VF9_ECO'
  },
  {
    name: 'VinFast VF9 Plus',
    brand: 'VINFAST',
    model: 'VF9',
    version: 'Plus',
    code: 'X00915',
    key: 'VINFAST_VF9_PLUS'
  },
  {
    name: 'Volkswagen Beetle Dune',
    brand: 'VOLKSWAGEN',
    model: 'Beetle',
    version: 'Dune',
    code: 'X00916',
    key: 'VOLKSWAGEN_BEETLE_DUNE'
  },
  {
    name: 'Volkswagen Passat 1.8 Bluemotion',
    brand: 'VOLKSWAGEN',
    model: 'Passat',
    version: '1.8 Bluemotion',
    code: 'X00917',
    key: 'VOLKSWAGEN_PASSAT_1_8_BLUEMOTION'
  },
  {
    name: 'Volkswagen Passat CC 2.0 AT',
    brand: 'VOLKSWAGEN',
    model: 'Passat',
    version: 'CC 2.0 AT',
    code: 'X00918',
    key: 'VOLKSWAGEN_PASSAT_CC_2_0_AT'
  },
  {
    name: 'Volkswagen Polo 1.6 AT',
    brand: 'VOLKSWAGEN',
    model: 'Polo',
    version: '1.6 AT',
    code: 'X00919',
    key: 'VOLKSWAGEN_POLO_1_6_AT'
  },
  {
    name: 'Volkswagen T-Cross Elegance 1.0 AT',
    brand: 'VOLKSWAGEN',
    model: 'T-Cross',
    version: 'Elegance 1.0 AT',
    code: 'X00920',
    key: 'VOLKSWAGEN_T_CROSS_ELEGANCE_1_0_AT'
  },
  {
    name: 'Volkswagen Teramont',
    brand: 'VOLKSWAGEN',
    model: '#VALUE!',
    version: '#VALUE!',
    code: 'X00921',
    key: 'VOLKSWAGEN_TERAMONT'
  },
  {
    name: 'Volkswagen Teramont 2.0 AT',
    brand: 'VOLKSWAGEN',
    model: 'Teramont',
    version: '2.0 AT',
    code: 'X00922',
    key: 'VOLKSWAGEN_TERAMONT_2_0_AT'
  },
  {
    name: 'Volkswagen Teramont Limited Edition 2.0 AT',
    brand: 'VOLKSWAGEN',
    model: 'Teramont',
    version: 'Limited Edition 2.0 AT',
    code: 'X00923',
    key: 'VOLKSWAGEN_TERAMONT_LIMITED_EDITION_2_0_AT'
  },
  {
    name: 'Volkswagen Teramont X Luxury 2.0 AT',
    brand: 'VOLKSWAGEN',
    model: 'Teramont',
    version: 'X Luxury 2.0 AT',
    code: 'X00924',
    key: 'VOLKSWAGEN_TERAMONT_X_LUXURY_2_0_AT'
  },
  {
    name: 'Volkswagen Teramont X Platinum 2.0 AT',
    brand: 'VOLKSWAGEN',
    model: 'Teramont',
    version: 'X Platinum 2.0 AT',
    code: 'X00925',
    key: 'VOLKSWAGEN_TERAMONT_X_PLATINUM_2_0_AT'
  },
  {
    name: 'Volkswagen Tiguan Allspace',
    brand: 'VOLKSWAGEN',
    model: 'Tiguan',
    version: 'Allspace',
    code: 'X00926',
    key: 'VOLKSWAGEN_TIGUAN_ALLSPACE'
  },
  {
    name: 'Volkswagen Tiguan Facelift',
    brand: 'VOLKSWAGEN',
    model: 'Tiguan',
    version: 'Facelift',
    code: 'X00927',
    key: 'VOLKSWAGEN_TIGUAN_FACELIFT'
  },
  {
    name: 'Volkswagen Touareg 3.6 AT',
    brand: 'VOLKSWAGEN',
    model: 'Touareg',
    version: '3.6 AT',
    code: 'X00928',
    key: 'VOLKSWAGEN_TOUAREG_3_6_AT'
  },
  {
    name: 'Volkswagen Touareg Elegance 2.0 TSI',
    brand: 'VOLKSWAGEN',
    model: 'Touareg',
    version: 'Elegance 2.0 TSI',
    code: 'X00929',
    key: 'VOLKSWAGEN_TOUAREG_ELEGANCE_2_0_TSI'
  },
  {
    name: 'Volkswagen Touareg Luxury 2.0 TSI',
    brand: 'VOLKSWAGEN',
    model: 'Touareg',
    version: 'Luxury 2.0 TSI',
    code: 'X00930',
    key: 'VOLKSWAGEN_TOUAREG_LUXURY_2_0_TSI'
  },
  {
    name: 'Volkswagen Viloran Luxury',
    brand: 'VOLKSWAGEN',
    model: 'Viloran',
    version: 'Luxury',
    code: 'X00931',
    key: 'VOLKSWAGEN_VILORAN_LUXURY'
  },
  {
    name: 'Volkswagen Viloran Premium',
    brand: 'VOLKSWAGEN',
    model: 'Viloran',
    version: 'Premium',
    code: 'X00932',
    key: 'VOLKSWAGEN_VILORAN_PREMIUM'
  },
  {
    name: 'Volkswagen Viloran Premium 2.0 AT',
    brand: 'VOLKSWAGEN',
    model: 'Viloran',
    version: 'Premium 2.0 AT',
    code: 'X00933',
    key: 'VOLKSWAGEN_VILORAN_PREMIUM_2_0_AT'
  },
  {
    name: 'Volvo S90 Inscription LWB B6 AWD',
    brand: 'VOLVO',
    model: 'S90',
    version: 'Inscription LWB B6 AWD',
    code: 'X00934',
    key: 'VOLVO_S90_INSCRIPTION_LWB_B6_AWD'
  },
  {
    name: 'Volvo S90 LWB Ultimate B6 AWD',
    brand: 'VOLVO',
    model: 'S90',
    version: 'LWB Ultimate B6 AWD',
    code: 'X00935',
    key: 'VOLVO_S90_LWB_ULTIMATE_B6_AWD'
  },
  {
    name: 'Volvo XC60 Ultimate Bright B6 AWD',
    brand: 'VOLVO',
    model: 'XC60',
    version: 'Ultimate Bright B6 AWD',
    code: 'X00936',
    key: 'VOLVO_XC60_ULTIMATE_BRIGHT_B6_AWD'
  },
  {
    name: 'Volvo XC60 Ultimate Bright B6 AWD 2.0 AT',
    brand: 'VOLVO',
    model: 'XC60',
    version: 'Ultimate Bright B6 AWD 2.0 AT',
    code: 'X00937',
    key: 'VOLVO_XC60_ULTIMATE_BRIGHT_B6_AWD_2_0_AT'
  },
  {
    name: 'Volvo XC90 Recharge T8 AWD',
    brand: 'VOLVO',
    model: 'XC90',
    version: 'Recharge T8 AWD',
    code: 'X00938',
    key: 'VOLVO_XC90_RECHARGE_T8_AWD'
  },
  {
    name: 'Volvo XC90 Recharge Ultimate T8 AWD',
    brand: 'VOLVO',
    model: 'XC90',
    version: 'Recharge Ultimate T8 AWD',
    code: 'X00939',
    key: 'VOLVO_XC90_RECHARGE_ULTIMATE_T8_AWD'
  },
  {
    name: 'Volvo XC90 T6 2.0 AT',
    brand: 'VOLVO',
    code: 'X00945',
    key: 'VOLVO_XC90_T6_2_0_AT'
  },
  {
    name: 'Volvo XC90 T6 Inscription',
    brand: 'VOLVO',
    model: 'XC90',
    version: 'T6 Inscription',
    code: 'X00940',
    key: 'VOLVO_XC90_T6_INSCRIPTION'
  },
  {
    name: 'Volvo XC90 Ultimate B6 AWD',
    brand: 'VOLVO',
    model: 'XC90',
    version: 'Ultimate B6 AWD',
    code: 'X00941',
    key: 'VOLVO_XC90_ULTIMATE_B6_AWD'
  }
]
