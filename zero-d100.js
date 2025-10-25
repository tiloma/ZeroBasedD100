// Zero-Based D100 for Foundry VTT v13
// Subtrahiert automatisch 1 von JEDEM d100 Wurf → 0..99 statt 1..100

Hooks.on("preCreateChatMessage", (message, data, options, userId) => {
  const rollData = message.rolls;
  if (!rollData?.length) return;

  for (let roll of rollData) {
    // Prüfe ob dieser Wurf ein einzelner d100 ist
    // Beispiel: "1d100", "d100"
    if (/^(\d+)?d100($|[^0-9])/i.test(roll.formula)) {
      // Wert korrigieren
      roll._total = (roll.total - 1);

      // Ergebnisse aktualisieren - wichtig für Anzeigen
      if (roll.terms && roll.terms.length > 0 && roll.terms[0].results) {
        roll.terms[0].results = roll.terms[0].results.map(r => ({
          ...r,
          result: r.result - 1
        }));
      }

      // Nachricht neu rendern
      message.updateSource({ content: roll.render() });
    }
  }
});
