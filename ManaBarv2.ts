// interface HeroMana {
//     mana: number;
//     maxMana: number;
//     hero: Hero;
// }

// // let test: Record<string, HeroMana> = {};

// // let data: HeroMana = {
// //     mana: 123,
// //     maxMana: 300
// // }

// // test["antimage"] = data;

// // test["creeo"] = data;

// namespace ManaBarv2 {
//     export let s: ScriptDescription = {};
//     let localHero: Hero = null;
//     let enemyHeros: Array<Hero> = [];
//     let allyHeros: Array<Hero> = [];
//     let enemyManas: Record<number, HeroMana> = {}
//     let manaBarEnabled = Menu.AddToggle(['Ty4kaa', 'Manabar'], "Enabled", false);

//     s.OnScriptLoad = () => {
//         console.log("Script ");
//         if(GameRules.IsActiveGame()){
//             s.OnGameStart()
//         }

        
//     };

//     s.OnGameStart = () => {
//         localHero = EntitySystem.GetLocalHero()
//         let allHero = EntitySystem.GetHeroesList();
//         for (let hero of allHero){
//             console.log(hero.GetUnitName())
//             if(!localHero.IsSameTeam(hero)){
//                 enemyHeros.push(hero)
//             }
//         }
//     };
//     s.OnUpdate = () => {
//         for (let enemyHero of enemyHeros){
//             let data: HeroMana = {
//                 mana: enemyHero.GetMana(),
//                 maxMana: enemyHero.GetMaxMana(),
//                 hero: enemyHero
                
//             }
//             enemyManas[enemyHero.GetIndex()] = data;
//         }
//     }

//     // Array<number> = [123,123,123];
//     // let test: Record<number, HeroMana> = {
//     //     1: {
//     //         mana: 123,
//     //         maxMana: 321
//     //     },
//     //     2: {
//     //         mana: 123,
//     //         maxMana: 321
//     //     }
//     // }
//     s.OnDraw = () => {
//         if (manaBarEnabled.GetValue() == true)  {
//             for (let index of Object.keys(enemyManas)){
//                 let heroMana = enemyManas[index];
//                 let hero: Hero = heroMana.hero;

//                 if (hero.IsDormant() || hero.IsIllusion() || hero.IsMeepoClone()) {
//                     continue;
//                 };

//                 let abs = hero.GetAbsOrigin();

//                 abs.z += hero.GetHealthBarOffset();
                
//                 let[x, y, onscreen] = Renderer.WorldToScreen(abs);
//                 if (!onscreen){
//                     continue
//                 };
        
//                 Renderer.SetDrawColor(0, 0 ,0 ,255);
//                 Renderer.DrawFilledRect(x-68, y-20, 130, 5);
//                 let pxPerMana = heroMana.maxMana / 133
//                 let currentWidthBar = heroMana.mana / pxPerMana;

//                 Renderer.SetDrawColor(79, 120 ,250 ,255);
//                 Renderer.DrawFilledRect(x-68, y-23, currentWidthBar, 6);

//                 let health = hero.GetHealth()
//                 let MaxHealth = hero.GetMaxHealth()

//                 let pxPerhealth = MaxHealth / 133
//                 let currentWidthBarhp = health / pxPerhealth;

//                 Renderer.SetDrawColor(255, 0 , 0 ,255);
//                 Renderer.DrawFilledRect(x-68, y-40, currentWidthBarhp, 15);

//             }
//         }

//     }
// }
// RegisterScript(ManaBarv2.s)