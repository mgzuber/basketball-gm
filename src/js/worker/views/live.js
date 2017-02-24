// @flow

import g from '../../globals';
import * as season from '../core/season';

async function updateGamesList() {
    const games = await season.getSchedule(true);

    for (const game of games) {
        if (game.awayTid === g.userTid || game.homeTid === g.userTid) {
            game.highlight = true;
        } else {
            game.highlight = false;
        }
        game.awayRegion = g.teamRegionsCache[game.awayTid];
        game.awayName = g.teamNamesCache[game.awayTid];
        game.homeRegion = g.teamRegionsCache[game.homeTid];
        game.homeName = g.teamNamesCache[game.homeTid];
    }

    return {
        games,
    };
}

async function updateGamesInProgress(inputs, updateEvents) {
    if (updateEvents.includes('dbChange') || updateEvents.includes('g.gamesInProgress')) {
        return {
            gamesInProgress: g.gamesInProgress,
        };
    }
}

export default {
    runBefore: [updateGamesList, updateGamesInProgress],
};