namespace Autostick {
export let exampleScript: ScriptDescription = {};

let ir = "eroe"

exampleScript.OnScriptLoad = () => {
    console.log('AutoStickByTy4kaa complite');
};

// let inputBoxValue = Menu.AddInputBox(
//     ['My', 'Own', 'Path'], // whereAt
//     'Input Box', // name
//     'Test' // defaultValue
// )
//     .SetNameLocale(locale, loc(locale, "weatherChanger", "type"))
//     .OnChange(state => (inputBoxValue = state.newValue))
//     .GetValue();

// exampleScript.OnUpdate = () => {
//     console.log(`Current input box value ${inputBoxValue}`);
// };

let Autostick = 
    Menu.AddToggle(['Ty4kaa'],  'AutoStick', true,)

let HealthStick = Menu.AddSlider(['T4Script'], 'Хп для активации', 10, 1000, 100, 10)
let quantityStcicks = Menu.AddSlider(['T4Script'], 'Мин число стиков для активации', 0, 20, 5, 1)

exampleScript.OnUpdate = () => {
    if (Autostick.GetValue() != true) {
        return
    }
    if (!GameRules.IsActiveGame){
        return
    }
    let localHero = EntitySystem.GetLocalHero();
    let localPlayer = EntitySystem.GetLocalPlayer();

    //  let items = LocalHero.GetItem("item_magic_stick", true);
    
    // for (let index = 0; index < items.length; index++) {
    //     const element = items[index];
    //     console.log(element.GetName())
    // }

    let stick = localHero.GetItem("item_magic_wand", true) ? localHero.GetItem("item_magic_wand", true) : localHero.GetItem("item_magic_stick", true)
    
    if (!stick || stick.GetCurrentCharges() === quantityStcicks.GetValue()){
        return
    } 

    if (!localPlayer || !localHero){
        return
    }

    if (localHero.GetHealth() > HealthStick.GetValue() - 1){
        return
    }

    localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET, localHero, null, stick, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero,);

    // console.log(stick.GetCurrentCharges())
    // if (Engine.OnceAtByKey(0, 'уник название') { ...code }

}

// exampleScript.OnUpdate = () => {
//     if (myOption.GetValue() === true) {
//         console.log('Option is enabled');
//     } else {
//         console.log('Option is disabled :(');
//     }
// };
}

RegisterScript(Autostick.exampleScript);