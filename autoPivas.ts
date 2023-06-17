namespace autoPivas {
    export let pavise: ScriptDescription = {};
    let localHero: Hero = null;
    let localPlayer: Player = null;
    let pivas: Item = null;
    let AllyHeroes: Array<Hero> = [];
    let scriptOk: boolean = false;
    
    pavise.OnScriptLoad = pavise.OnGameStart = () => {
        console.log("AutoPaviseByTy4kaa launched!")
        localHero = EntitySystem.GetLocalHero();
        localPlayer = EntitySystem.GetLocalPlayer();

        if (!localHero || !localPlayer){
            return
        }
        let AllyHeroes = EntitySystem.GetHeroesList()
        for (let allyHero of AllyHeroes){
            if(allyHero.IsSameTeam){
                AllyHeroes.push(allyHero)
            }
        }
        scriptOk = true;
        console.log("inited")
    }

    pavise.OnGameEnd = () => {
        scriptOk = false;
        AllyHeroes = [];
        localHero = null;
        localPlayer = null;
    }

    pavise.OnUnitAnimation = (animation:UnitAnimationCallbackObject) => {
        if (
            !scriptOk || 
            !animation.unit || 
            !animation.unit.IsHero() || 
            animation.unit.IsSameTeam(localHero) ||
            !animation.sequenceName.startsWith("attack")
        ) { 
        return};
        let attackHero: Hero = animation.unit as Hero;
        let attackAbs: Vector = attackHero.GetAbsOrigin();
        let attackTarget: NPC = attackHero.FindFacingNPC(Enum.TeamType.TEAM_ENEMY);
        
        if(
            attackTarget &&
            attackTarget.IsHero() &&
            attackTarget.GetAbsOrigin().Distance(attackAbs) <= attackHero.GetAttackRange() || attackHero.GetAttackRangeBonus()

        ){}
        else{
            attackTarget = null
            for (let allyHero of AllyHeroes){
                let allypos = allyHero.GetAbsOrigin();
                if (allypos.Distance(attackAbs) <= attackHero.GetAttackRange() || attackHero.GetAttackRangeBonus()){
                    break;
                }
            }
        }

        if(!attackTarget){
            return
        }
        
        if(attackTarget.GetHealth() < attackHero.GetMinDamage()){
            let pivas = localHero.GetItem("item_pivase", true);
            if (!pivas || pivas.GetCooldown() > 0){
                return
            }
            localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_TARGET, attackTarget, attackTarget.GetAbsOrigin(), pivas, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero,);
        }

        
    }




// }
//     // pavise.OnUnitAnimation = () => {
//     //     localHero = EntitySystem.GetLocalHero();
//     //     localPlayer = EntitySystem.GetLocalPlayer();
//     //     pivas = localHero.GetItem("item_magic_wand", true)
//     //     localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_TARGET, localHero, localHero.GetAbsOrigin(), pivas, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero,);

}
RegisterScript(autoPivas.pavise)