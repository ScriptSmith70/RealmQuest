class StoryNode {
    constructor(description, dynamicDescriptions = null) {
        this.description = description;
        this.dynamicDescriptions = dynamicDescriptions || [];
        this.options = [];
        this.nextNodes = [];
    }

    addChoice(option, nextNode) {
        this.options.push(option);
        this.nextNodes.push(nextNode);
    }

    getDescription(playerChoices) {
        if (this.dynamicDescriptions.length > 0) {
            for (let dynamicDescription of this.dynamicDescriptions) {
                if (dynamicDescription.condition(playerChoices)) {
                    return dynamicDescription.text;
                }
            }
        }
        return this.description;
    }

    getNextNode(choice) {
        const index = this.options.indexOf(choice);
        if (index !== -1) {
            return this.nextNodes[index];
        }
        return null;
    }
}

class Player {
    constructor() {
        this.health = 100;
        this.sanity = 100;
        this.clues = 0;
        this.inventory = [];
        this.journal = [];
        this.morality = 0; // Neutral at start, can go positive or negative
        this.reputation = 0; // Reputation score with NPCs
        this.choices = [];
    }

    updateStats() {
        document.getElementById("health").textContent = this.health;
        document.getElementById("sanity").textContent = this.sanity;
        document.getElementById("clues").textContent = this.clues;
        document.getElementById("morality").textContent = this.morality >= 0 ? `Good (+${this.morality})` : `Bad (${this.morality})`;
        document.getElementById("reputation").textContent = this.reputation >= 0 ? `Good (+${this.reputation})` : `Bad (${this.reputation})`;
    }

    changeMorality(amount) {
        this.morality += amount;
        this.updateStats();
    }

    changeReputation(amount) {
        this.reputation += amount;
        this.updateStats();
    }

    addToInventory(item) {
        this.inventory.push(item);
        this.updateInventory();
    }

    updateInventory() {
        const inventoryDiv = document.getElementById("inventory");
        inventoryDiv.innerHTML = this.inventory.length ? '' : 'None';
        this.inventory.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'inventory-item';
            itemDiv.textContent = item;
            inventoryDiv.appendChild(itemDiv);
        });
    }

    addToJournal(entry) {
        this.journal.push(entry);
        this.updateJournal();
    }

    updateJournal() {
        const journalDiv = document.getElementById("journal");
        journalDiv.innerHTML = this.journal.length ? '' : 'No entries yet.';
        this.journal.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'journal-entry';
            entryDiv.textContent = entry;
            journalDiv.appendChild(entryDiv);
        });
    }

    makeChoice(choice) {
        this.choices.push(choice);
    }
}

class AdventureGame {
    constructor() {
        this.initializeStory();
        this.player = new Player();
        this.currentNode = this.startNode;
        this.player.updateStats();
        this.displayStory();
    }

    initializeStory() {
        const node1 = new StoryNode("You encounter a beggar asking for food. Do you help or ignore them?");
        const node2 = new StoryNode("You gave the beggar food. They thank you and provide useful information.");
        const node3 = new StoryNode("You ignored the beggar. They curse you as you walk away.");
        
        node1.addChoice("Help the beggar", node2);
        node1.addChoice("Ignore the beggar", node3);

        node2.addChoice("Continue on your journey", node1);
        node3.addChoice("Continue on your journey", node1);

        this.startNode = node1;
    }

    displayStory() {
        const storyText = document.getElementById("story-text");
        storyText.textContent = this.currentNode.getDescription(this.player.choices);
        
        const choicesDiv = document.getElementById("choices");
        choicesDiv.innerHTML = '';
        this.currentNode.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => this.makeChoice(option);
            choicesDiv.appendChild(button);
        });
    }

    makeChoice(choice) {
        const nextNode = this.currentNode.getNextNode(choice);
        if (nextNode) {
            if (choice === "Help the beggar") {
                this.player.changeMorality(10);  // Increase morality
                this.player.changeReputation(5); // Increase reputation
                this.player.addToJournal("You helped a beggar and gained useful information.");
            } else if (choice === "Ignore the beggar") {
                this.player.changeMorality(-10); // Decrease morality
                this.player.changeReputation(-5); // Decrease reputation
                this.player.addToJournal("You ignored a beggar. They cursed you.");
            }
            this.player.makeChoice(choice);
            this.currentNode = nextNode;
            this.displayStory();
        } else {
            alert("You need a specific item or more supplies to proceed!");
        }
    }

    start() {
        this.displayStory();
    }
}

const game = new AdventureGame();
game.start();
