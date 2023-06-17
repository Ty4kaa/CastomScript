namespace MineKiller {
    export let mine: ScriptDescription = {};
    let localHero: Hero = null;
    let npclist: Array<NPC> = [];
    let attackDelay: boolean = false;

    mine.OnScriptLoad = () =>{
        console.log("MineKillerByTy4kaa launched!")
    };

    let ok = Menu.AddToggle(['Ty4kaa', 'MineKiller'],  'Enable', true,);

    mine.OnUpdate = () => {
        if (ok.GetValue() == false) { return };
        let localPlayer = EntitySystem.GetLocalPlayer();
        localHero = EntitySystem.GetLocalHero();
        npclist = EntitySystem.GetNPCsList();
        for (let techiesMine of npclist){
            if(techiesMine.GetEntityName() == "npc_dota_techies_mines"){
                console.log("Atatata 12312!");
                if(techiesMine.GetAbsOrigin().Distance(localHero.GetAbsOrigin()) < 500 && techiesMine.IsAlive()){

                    if (!attackDelay) {
                        console.log("Atatata!")
                        localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_TARGET, techiesMine, techiesMine.GetAbsOrigin(), null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero)
                        attackDelay = true;

                        setTimeout(() => {attackDelay = false}, localHero.GetAttackTime() * 1000);
                    }
                    
                    //localPlayer.AttackTarget(localHero, techiesMine)
                }
            }
            
        }
            // localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_ATTACK_TARGET, techiesMine, techiesMine.GetAbsOrigin(), null, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero)

    };
        
}

// RegisterScript(MineKiller.mine)