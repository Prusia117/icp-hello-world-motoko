import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Float "mo:base/Float";
actor {

/********* Tipos de datos perzonalizados *********/ 

  // Tipo de dato de entrada
  type InputDataType = {
    //titleInput : Float;
    lengthInput : Float;
    widthInput : Float;
    heightInput : Float;
    enduranceInput : Text;
  };

  // Tipo de dato de salida
  type outDataType = {
    //tittle : Text;
    mcubic : Float;
    wbucket : Float;
    gbucket : Float;
    ssand : Float;
    scement : Float;
  };

  // Tipo de dato de equivalencias de materiales
  type EquivalencesType = {
    wbucket : Float;
    gbucket : Float;
    ssand : Float;
    scement : Float;
  };

/********* HashMap *********/ 

  // Base de datos de equivalencias basada en HashMap
  let equivalencesDB = HashMap.HashMap<Text, EquivalencesType>(5, Text.equal, Text.hash);

  // Agragando equivalencias al HashMap
  equivalencesDB.put(
    "endurance100",
    {
      wbucket = 12.5;
      gbucket = 40;
      ssand = 35;
      scement = 5;
    },
  );

  equivalencesDB.put(
    "endurance150",
    {
      wbucket = 12;
      gbucket = 39;
      ssand = 33;
      scement = 6;
    },
  );

  equivalencesDB.put(
    "endurance200",
    {
      wbucket = 12.25;
      gbucket = 38.5;
      ssand = 31.5;
      scement = 7;
    },
  );

  equivalencesDB.put(
    "endurance250",
    {
      wbucket = 12;
      gbucket = 40;
      ssand = 28;
      scement = 8;
    },
  );

  equivalencesDB.put(
    "endurance300",
    {
      wbucket = 11.5;
      gbucket = 36;
      ssand = 22.5;
      scement = 9;
    },
  );

  /********* Declaración de variablaes *********/ 
  var _cmeters : Float = 0;

  var _outData : outDataType = {
    //tittle = "";
    mcubic = 0;
    wbucket = 0;
    gbucket = 0;
    ssand = 0;
    scement = 0;
  };

  /********* Funciones *********/ 

  // Función para obtener las equivalencias de materiales mediante un codigo de resistencia
  public func getEquivalences(_input : InputDataType) : async ?EquivalencesType {
    return equivalencesDB.get(_input.enduranceInput);
  };

  // Función para calcular los metros cúbicos con la formula Altura x Ancho x Largo
  public func calculateCubicMeters(_input : InputDataType) : async Float {
    return _input.lengthInput * _input.widthInput * _input.heightInput;
  };

  // Función para calcular la dosificación de concreto con la formula metros cúbicos x equivalencias
  public func calculateDosage(_input : InputDataType) : async ?outDataType {

    //Calculando los metros cúbicos
    _cmeters := await calculateCubicMeters(_input);

    //Obteniendo las equivalencias de materiales mediante el codigo de resistencia
    let _equivalences = await getEquivalences(_input);


    switch (_equivalences) {
      case (?e) {

        //Calculando la dosificación
        _outData := {
          //tittle = "Lot Calculation";
          mcubic = _cmeters;
          wbucket = _cmeters * e.wbucket;
          gbucket = _cmeters * e.gbucket;
          ssand = _cmeters * e.ssand;
          scement = _cmeters * e.scement;
        };
      };
      case (null) return null;
    };

    //Retornando la dosificación
    return ?_outData;
  };

};
