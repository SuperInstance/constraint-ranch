# Constraint Ranch - JSON Schema Specification

This document provides complete JSON schemas for all game data structures in Constraint Ranch.

> **Related:** [PUZZLE_FORMAT.md](./PUZZLE_FORMAT.md) | [ARCHITECTURE.md](./ARCHITECTURE.md) | [AGENT_SPECIES.md](./AGENT_SPECIES.md)

---

## Table of Contents

1. [Puzzle JSON Schema](#puzzle-json-schema)
2. [Agent Types Schema](#agent-types-schema)
3. [Breeding Outcomes Schema](#breeding-outcomes-schema)
4. [Scoring Calculation Schema](#scoring-calculation-schema)

---

## Puzzle JSON Schema

### Complete Puzzle Schema (JSON Schema Draft-07)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://constraint-ranch.superinstance.ai/schemas/puzzle.json",
  "title": "Puzzle",
  "description": "A constraint-based puzzle in Constraint Ranch",
  "oneOf": [
    { "$ref": "#/definitions/SpatialPuzzle" },
    { "$ref": "#/definitions/RoutingPuzzle" },
    { "$ref": "#/definitions/BreedingPuzzle" },
    { "$ref": "#/definitions/CoordinationPuzzle" },
    { "$ref": "#/definitions/AdvancedPuzzle" }
  ],
  
  "definitions": {
    "PuzzleType": {
      "type": "string",
      "enum": ["spatial", "routing", "breeding", "coordination", "advanced"],
      "description": "The category of puzzle"
    },
    
    "Difficulty": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5,
      "description": "Puzzle difficulty level (1-5)"
    },
    
    "Position": {
      "type": "object",
      "required": ["x", "y"],
      "properties": {
        "x": { "type": "number", "minimum": 0 },
        "y": { "type": "number", "minimum": 0 }
      },
      "additionalProperties": false
    },
    
    "Zone": {
      "type": "object",
      "required": ["id", "x", "y", "radius"],
      "properties": {
        "id": { "type": "string", "pattern": "^[a-z0-9-]+$" },
        "x": { "type": "number", "minimum": 0 },
        "y": { "type": "number", "minimum": 0 },
        "radius": { "type": "number", "exclusiveMinimum": 0 }
      },
      "additionalProperties": false
    },
    
    "MapSize": {
      "type": "object",
      "required": ["width", "height"],
      "properties": {
        "width": { "type": "number", "exclusiveMinimum": 0 },
        "height": { "type": "number", "exclusiveMinimum": 0 }
      },
      "additionalProperties": false
    },
    
    "Trait": {
      "type": "object",
      "required": ["name", "value"],
      "properties": {
        "name": { 
          "type": "string",
          "enum": [
            "alertness", "speed", "accuracy", "endurance",
            "connectivity", "throughput", "latency", "reliability",
            "intelligence", "navigation", "debug", "patience",
            "cooperation", "communication", "agreement",
            "memory", "processing", "versatility", "stamina",
            "range", "precision", "agility", "hardware", "robustness", "low-level",
            "polite", "concise", "technical", "creativity", "empathy", "adaptability",
            "fast-response"
          ]
        },
        "value": { 
          "type": "number", 
          "minimum": 0, 
          "maximum": 1,
          "description": "Trait value between 0.0 and 1.0"
        }
      },
      "additionalProperties": false
    },
    
    "ConstraintUnit": {
      "type": "string",
      "enum": [
        "units", "percentage", "ms", "seconds", "agents", 
        "tasks/min", "credits/hour", "degrees", "hours", "items/min"
      ]
    },
    
    "Constraint": {
      "type": "object",
      "required": ["type", "value"],
      "properties": {
        "type": { 
          "type": "string",
          "description": "Constraint type identifier"
        },
        "value": { 
          "oneOf": [
            { "type": "number" },
            { "type": "string" },
            { "type": "boolean" }
          ]
        },
        "unit": { "$ref": "#/definitions/ConstraintUnit" },
        "trait": { 
          "type": "string",
          "description": "Trait name for trait-specific constraints"
        },
        "tolerance": { 
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "Acceptable deviation from value"
        },
        "expression": {
          "type": "string",
          "enum": ["dominant", "recessive", "additive"],
          "description": "Gene expression type for breeding constraints"
        },
        "resource": {
          "type": "string",
          "description": "Resource name for resource constraints"
        },
        "taskId": {
          "type": "string",
          "description": "Task ID reference for task-specific constraints"
        }
      },
      "additionalProperties": true
    },
    
    "Hint": {
      "type": "object",
      "required": ["level", "text"],
      "properties": {
        "level": { 
          "type": "integer", 
          "minimum": 1, 
          "maximum": 3 
        },
        "text": { 
          "type": "string", 
          "minLength": 1,
          "maxLength": 500
        }
      },
      "additionalProperties": false
    },
    
    "PuzzleRewards": {
      "type": "object",
      "required": ["experience"],
      "properties": {
        "experience": { 
          "type": "integer", 
          "minimum": 0,
          "description": "Base XP awarded for completion"
        },
        "unlocks": {
          "type": "array",
          "items": { "type": "string" },
          "description": "IDs of unlocked content"
        },
        "achievements": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Achievement IDs to grant"
        }
      },
      "additionalProperties": false
    },
    
    "BasePuzzle": {
      "type": "object",
      "required": ["id", "name", "type", "difficulty", "description", "constraints", "hints", "rewards"],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^(spatial|routing|breeding|coordination|advanced)-[0-9]{3}$",
          "description": "Unique puzzle identifier"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "type": { "$ref": "#/definitions/PuzzleType" },
        "difficulty": { "$ref": "#/definitions/Difficulty" },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 500
        },
        "constraints": {
          "type": "array",
          "items": { "$ref": "#/definitions/Constraint" },
          "minItems": 1
        },
        "hints": {
          "type": "array",
          "items": { "$ref": "#/definitions/Hint" },
          "minItems": 1,
          "maxItems": 3
        },
        "rewards": { "$ref": "#/definitions/PuzzleRewards" }
      }
    },
    
    "SpatialPuzzle": {
      "allOf": [
        { "$ref": "#/definitions/BasePuzzle" },
        {
          "type": "object",
          "required": ["initialState", "goalState"],
          "properties": {
            "type": { "const": "spatial" },
            "initialState": {
              "type": "object",
              "required": ["mapSize", "zones"],
              "properties": {
                "mapSize": { "$ref": "#/definitions/MapSize" },
                "zones": {
                  "type": "array",
                  "items": { "$ref": "#/definitions/Zone" }
                },
                "obstacles": {
                  "type": "array",
                  "items": { "$ref": "#/definitions/Position" }
                }
              }
            },
            "goalState": {
              "type": "array",
              "items": { "$ref": "#/definitions/Constraint" }
            },
            "timeLimit": {
              "type": "integer",
              "exclusiveMinimum": 0,
              "description": "Optional time limit in seconds"
            }
          }
        }
      ]
    },
    
    "RoutingPuzzle": {
      "allOf": [
        { "$ref": "#/definitions/BasePuzzle" },
        {
          "type": "object",
          "required": ["initialState", "goalState"],
          "properties": {
            "type": { "const": "routing" },
            "initialState": {
              "type": "object",
              "required": ["taskTypes", "availableAgents"],
              "properties": {
                "taskTypes": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["type", "rate"],
                    "properties": {
                      "type": { "type": "string" },
                      "rate": { 
                        "type": "integer",
                        "exclusiveMinimum": 0,
                        "description": "Tasks per minute"
                      }
                    }
                  }
                },
                "availableAgents": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["species", "capacity"],
                    "properties": {
                      "species": { 
                        "type": "string",
                        "enum": ["chicken", "duck", "goat", "sheep", "cattle", "horse", "falcon", "hog"]
                      },
                      "capacity": { 
                        "type": "integer",
                        "exclusiveMinimum": 0,
                        "description": "Max tasks per minute"
                      }
                    }
                  }
                }
              }
            },
            "goalState": {
              "type": "array",
              "items": { "$ref": "#/definitions/Constraint" }
            }
          }
        }
      ]
    },
    
    "BreedingPuzzle": {
      "allOf": [
        { "$ref": "#/definitions/BasePuzzle" },
        {
          "type": "object",
          "required": ["initialState", "goalState"],
          "properties": {
            "type": { "const": "breeding" },
            "initialState": {
              "type": "object",
              "required": ["parentA", "parentB", "genePool"],
              "properties": {
                "parentA": {
                  "type": "array",
                  "items": { "$ref": "#/definitions/Trait" }
                },
                "parentB": {
                  "type": "array",
                  "items": { "$ref": "#/definitions/Trait" }
                },
                "genePool": {
                  "type": "array",
                  "items": { "type": "string" }
                }
              }
            },
            "goalState": {
              "type": "object",
              "required": ["targetTraits"],
              "properties": {
                "targetTraits": {
                  "type": "array",
                  "items": { "$ref": "#/definitions/Trait" }
                }
              }
            }
          }
        }
      ]
    },
    
    "CoordinationPuzzle": {
      "allOf": [
        { "$ref": "#/definitions/BasePuzzle" },
        {
          "type": "object",
          "required": ["initialState", "goalState"],
          "properties": {
            "type": { "const": "coordination" },
            "initialState": {
              "type": "object",
              "required": ["agents", "tasks"],
              "properties": {
                "agents": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["id", "species", "position"],
                    "properties": {
                      "id": { "type": "string" },
                      "species": { 
                        "type": "string",
                        "enum": ["chicken", "duck", "goat", "sheep", "cattle", "horse", "falcon", "hog"]
                      },
                      "position": { "$ref": "#/definitions/Position" }
                    }
                  }
                },
                "tasks": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["id", "requiredAgents", "location"],
                    "properties": {
                      "id": { "type": "string" },
                      "requiredAgents": { 
                        "type": "integer",
                        "minimum": 1
                      },
                      "location": { "$ref": "#/definitions/Position" }
                    }
                  }
                }
              }
            },
            "goalState": {
              "type": "array",
              "items": { "$ref": "#/definitions/Constraint" }
            }
          }
        }
      ]
    },
    
    "AdvancedPuzzle": {
      "allOf": [
        { "$ref": "#/definitions/BasePuzzle" },
        {
          "type": "object",
          "required": ["subPuzzles", "initialState", "goalState"],
          "properties": {
            "type": { "const": "advanced" },
            "subPuzzles": {
              "type": "array",
              "items": {
                "type": "object",
                "required": ["type", "puzzle"],
                "properties": {
                  "type": { "$ref": "#/definitions/PuzzleType" },
                  "puzzle": {
                    "oneOf": [
                      { "$ref": "#/definitions/SpatialPuzzle" },
                      { "$ref": "#/definitions/RoutingPuzzle" },
                      { "$ref": "#/definitions/BreedingPuzzle" },
                      { "$ref": "#/definitions/CoordinationPuzzle" }
                    ]
                  },
                  "dependencies": {
                    "type": "array",
                    "items": { "type": "string" },
                    "description": "IDs of prerequisite sub-puzzles"
                  }
                }
              }
            },
            "initialState": {
              "type": "object",
              "required": ["agents", "resources", "globalConstraints"],
              "properties": {
                "agents": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["id", "species", "position", "traits"],
                    "properties": {
                      "id": { "type": "string" },
                      "species": { "type": "string" },
                      "position": { "$ref": "#/definitions/Position" },
                      "traits": {
                        "type": "object",
                        "additionalProperties": {
                          "type": "number",
                          "minimum": 0,
                          "maximum": 1
                        }
                      }
                    }
                  }
                },
                "resources": {
                  "type": "object",
                  "additionalProperties": { "type": "number" }
                },
                "globalConstraints": {
                  "type": "array",
                  "items": { "$ref": "#/definitions/Constraint" }
                }
              }
            },
            "goalState": {
              "type": "array",
              "items": { "$ref": "#/definitions/Constraint" }
            }
          }
        }
      ]
    }
  }
}
```

---

## Agent Types Schema

### Species Definition Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://constraint-ranch.superinstance.ai/schemas/species.json",
  "title": "AgentSpecies",
  "description": "Definition of an agent species in Constraint Ranch",
  
  "type": "object",
  "required": ["id", "name", "emoji", "size", "specialty", "tier", "unlockLevel", "maxAgents", "traits"],
  
  "properties": {
    "id": {
      "type": "string",
      "enum": ["chicken", "duck", "goat", "sheep", "cattle", "horse", "falcon", "hog"],
      "description": "Unique species identifier"
    },
    "name": {
      "type": "string",
      "description": "Display name"
    },
    "emoji": {
      "type": "string",
      "description": "Unicode emoji representation"
    },
    "size": {
      "type": "string",
      "pattern": "^[0-9]+(MB|GB)$",
      "description": "Memory footprint"
    },
    "specialty": {
      "type": "string",
      "description": "Primary function/specialty"
    },
    "tier": {
      "type": "integer",
      "minimum": 1,
      "maximum": 4,
      "description": "Species tier (1-4)"
    },
    "unlockLevel": {
      "type": "integer",
      "minimum": 1,
      "description": "Player level required to unlock"
    },
    "maxAgents": {
      "type": "integer",
      "minimum": 1,
      "description": "Maximum agents of this type allowed"
    },
    "traits": {
      "type": "object",
      "description": "Trait ranges for this species",
      "additionalProperties": {
        "type": "object",
        "required": ["min", "max"],
        "properties": {
          "min": { "type": "number", "minimum": 0, "maximum": 1 },
          "max": { "type": "number", "minimum": 0, "maximum": 1 },
          "description": { "type": "string" }
        }
      }
    },
    "bestFor": {
      "type": "array",
      "items": { "type": "string" },
      "description": "Recommended use cases"
    },
    "breedingCompatibility": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["species", "result"],
        "properties": {
          "species": { "type": "string" },
          "result": { "type": "string" },
          "notes": { "type": "string" }
        }
      },
      "description": "Compatible breeding partners"
    }
  }
}
```

### Complete Species Data

```json
{
  "species": [
    {
      "id": "chicken",
      "name": "Chicken",
      "emoji": "🐔",
      "size": "5MB",
      "specialty": "Monitoring & Alerts",
      "tier": 1,
      "unlockLevel": 1,
      "maxAgents": -1,
      "traits": {
        "alertness": { "min": 0.8, "max": 1.0, "description": "Excellent at detecting issues" },
        "speed": { "min": 0.6, "max": 0.8, "description": "Quick to respond" },
        "accuracy": { "min": 0.5, "max": 0.7, "description": "Moderate precision" },
        "endurance": { "min": 0.3, "max": 0.5, "description": "Low stamina" }
      },
      "bestFor": ["monitoring", "alerts", "threshold-checks", "coverage-puzzles"]
    },
    {
      "id": "duck",
      "name": "Duck",
      "emoji": "🦆",
      "size": "100MB",
      "specialty": "API & Network",
      "tier": 2,
      "unlockLevel": 5,
      "maxAgents": 10,
      "traits": {
        "connectivity": { "min": 0.7, "max": 1.0, "description": "Excellent network handling" },
        "throughput": { "min": 0.6, "max": 0.9, "description": "High task volume" },
        "latency": { "min": 0.5, "max": 0.8, "description": "Good response times" },
        "reliability": { "min": 0.6, "max": 0.8, "description": "Solid uptime" }
      },
      "bestFor": ["api-endpoints", "network-routing", "request-handling", "routing-puzzles"]
    },
    {
      "id": "goat",
      "name": "Goat",
      "emoji": "🐐",
      "size": "150MB",
      "specialty": "Debug & Navigation",
      "tier": 2,
      "unlockLevel": 10,
      "maxAgents": 8,
      "traits": {
        "intelligence": { "min": 0.7, "max": 0.9, "description": "Good problem solving" },
        "navigation": { "min": 0.8, "max": 1.0, "description": "Excellent pathfinding" },
        "debug": { "min": 0.7, "max": 0.95, "description": "Strong error detection" },
        "patience": { "min": 0.6, "max": 0.9, "description": "Methodical approach" }
      },
      "bestFor": ["debugging", "path-optimization", "error-detection", "spatial-obstacles"]
    },
    {
      "id": "sheep",
      "name": "Sheep",
      "emoji": "🐑",
      "size": "50MB",
      "specialty": "Consensus Voting",
      "tier": 2,
      "unlockLevel": 15,
      "maxAgents": 15,
      "traits": {
        "cooperation": { "min": 0.8, "max": 1.0, "description": "Excellent teamwork" },
        "communication": { "min": 0.7, "max": 0.95, "description": "Clear messaging" },
        "patience": { "min": 0.6, "max": 0.9, "description": "Waits for consensus" },
        "agreement": { "min": 0.7, "max": 0.9, "description": "Finds common ground" }
      },
      "bestFor": ["distributed-consensus", "voting-systems", "multi-agent-coordination", "coordination-puzzles"]
    },
    {
      "id": "cattle",
      "name": "Cattle",
      "emoji": "🐄",
      "size": "500MB",
      "specialty": "Heavy Reasoning",
      "tier": 3,
      "unlockLevel": 20,
      "maxAgents": 5,
      "traits": {
        "intelligence": { "min": 0.8, "max": 1.0, "description": "Excellent reasoning" },
        "memory": { "min": 0.7, "max": 0.95, "description": "Large context" },
        "processing": { "min": 0.8, "max": 0.95, "description": "Deep analysis" },
        "speed": { "min": 0.3, "max": 0.6, "description": "Slower but thorough" }
      },
      "bestFor": ["complex-decisions", "large-context-analysis", "deep-reasoning", "advanced-puzzles"]
    },
    {
      "id": "horse",
      "name": "Horse",
      "emoji": "🐴",
      "size": "200MB",
      "specialty": "Pipeline ETL",
      "tier": 3,
      "unlockLevel": 25,
      "maxAgents": 8,
      "traits": {
        "throughput": { "min": 0.8, "max": 1.0, "description": "Excellent data flow" },
        "reliability": { "min": 0.7, "max": 0.95, "description": "Consistent execution" },
        "versatility": { "min": 0.6, "max": 0.9, "description": "Multiple formats" },
        "stamina": { "min": 0.8, "max": 0.95, "description": "Long-running tasks" }
      },
      "bestFor": ["etl-pipelines", "data-transformation", "batch-processing", "multi-stage-tasks"]
    },
    {
      "id": "falcon",
      "name": "Falcon",
      "emoji": "🦅",
      "size": "5MB",
      "specialty": "Multi-node Sync",
      "tier": 4,
      "unlockLevel": 30,
      "maxAgents": 10,
      "traits": {
        "speed": { "min": 0.9, "max": 1.0, "description": "Fastest species" },
        "range": { "min": 0.8, "max": 1.0, "description": "Long-distance communication" },
        "precision": { "min": 0.7, "max": 0.95, "description": "Accurate synchronization" },
        "agility": { "min": 0.9, "max": 1.0, "description": "Quick direction changes" }
      },
      "bestFor": ["multi-region-coordination", "clock-synchronization", "global-state-management", "cross-region-puzzles"]
    },
    {
      "id": "hog",
      "name": "Hog",
      "emoji": "🐗",
      "size": "10MB",
      "specialty": "Hardware GPIO",
      "tier": 4,
      "unlockLevel": 35,
      "maxAgents": 5,
      "traits": {
        "hardware": { "min": 0.8, "max": 1.0, "description": "Excellent device control" },
        "precision": { "min": 0.7, "max": 0.95, "description": "Accurate timing" },
        "robustness": { "min": 0.8, "max": 0.95, "description": "Handles physical stress" },
        "low-level": { "min": 0.9, "max": 1.0, "description": "Direct hardware access" }
      },
      "bestFor": ["gpio-control", "hardware-interfaces", "sensor-integration", "iot-puzzles"]
    }
  ]
}
```

---

## Breeding Outcomes Schema

### Breeding Calculation Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://constraint-ranch.superinstance.ai/schemas/breeding-outcome.json",
  "title": "BreedingOutcome",
  "description": "Schema for breeding calculation results",
  
  "definitions": {
    "GeneType": {
      "type": "string",
      "enum": ["additive", "dominant", "recessive"],
      "description": "How a gene is inherited"
    },
    
    "InheritanceWeight": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "Weight given to parent A (1 - weight = parent B weight)"
    },
    
    "TraitOutcome": {
      "type": "object",
      "required": ["name", "value", "geneType", "inheritanceMethod"],
      "properties": {
        "name": { "type": "string" },
        "value": { 
          "type": "number", 
          "minimum": 0, 
          "maximum": 1 
        },
        "geneType": { "$ref": "#/definitions/GeneType" },
        "inheritanceMethod": {
          "type": "string",
          "enum": ["weighted-average", "dominant-selection", "recessive-expression", "night-school-trained"]
        },
        "parentAContribution": {
          "type": "number",
          "description": "Value contributed by parent A"
        },
        "parentBContribution": {
          "type": "number",
          "description": "Value contributed by parent B"
        },
        "weight": { "$ref": "#/definitions/InheritanceWeight" },
        "nightSchoolBonus": {
          "type": "number",
          "minimum": 0,
          "maximum": 0.15,
          "description": "Bonus added by Night School training"
        }
      }
    }
  },
  
  "type": "object",
  "required": ["parents", "offspring", "generation", "calculationTimestamp"],
  
  "properties": {
    "parents": {
      "type": "object",
      "required": ["parentA", "parentB"],
      "properties": {
        "parentA": {
          "type": "object",
          "required": ["id", "species", "traits"],
          "properties": {
            "id": { "type": "string" },
            "species": { "type": "string" },
            "traits": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "value": { "type": "number" }
                }
              }
            }
          }
        },
        "parentB": {
          "type": "object",
          "required": ["id", "species", "traits"],
          "properties": {
            "id": { "type": "string" },
            "species": { "type": "string" },
            "traits": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "value": { "type": "number" }
                }
              }
            }
          }
        }
      }
    },
    "offspring": {
      "type": "object",
      "required": ["id", "species", "traits", "hybrid"],
      "properties": {
        "id": { "type": "string" },
        "species": { "type": "string" },
        "hybrid": { "type": "boolean" },
        "parentSpecies": {
          "type": "array",
          "items": { "type": "string" },
          "description": "If hybrid, the two parent species"
        },
        "traits": {
          "type": "array",
          "items": { "$ref": "#/definitions/TraitOutcome" }
        },
        "size": {
          "type": "string",
          "description": "Memory footprint (average of parents for hybrids)"
        },
        "specialty": {
          "type": "string",
          "description": "Combined specialty for hybrids"
        }
      }
    },
    "generation": {
      "type": "integer",
      "minimum": 1,
      "description": "Generation number of offspring"
    },
    "mutation": {
      "type": "object",
      "properties": {
        "occurred": { "type": "boolean" },
        "trait": { "type": "string" },
        "delta": { 
          "type": "number",
          "description": "Change from calculated value (+/- 0.05 to 0.15)"
        }
      }
    },
    "nightSchoolApplied": {
      "type": "boolean",
      "description": "Whether Night School training was applied"
    },
    "calculationTimestamp": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

### Breeding Formula Documentation

```typescript
/**
 * Breeding Formulas Reference
 * 
 * All breeding calculations use deterministic, exact arithmetic.
 */

// 1. Additive Gene Inheritance (default)
// Used for: speed, accuracy, most traits
function additiveInheritance(
  parentA: number,
  parentB: number,
  weight: number  // 0-1, bias toward parent A
): number {
  return (weight * parentA) + ((1 - weight) * parentB);
}

// Examples:
// weight = 0.5 (50/50 split)
// (0.5 * 0.9) + (0.5 * 0.6) = 0.75

// weight = 0.7 (70% A, 30% B)
// (0.7 * 0.9) + (0.3 * 0.6) = 0.81

// 2. Dominant Gene Expression
// Used for: fast-response, certain special traits
function dominantInheritance(
  dominantParent: number,
  recessiveParent: number,
  dominantFromA: boolean
): number {
  // Takes value from dominant parent
  return dominantFromA ? dominantParent : recessiveParent;
}

// 3. Recessive Gene Expression
// Used for: rare abilities that require both parents to contribute
function recessiveInheritance(
  parentA: number,
  parentB: number,
  bothCarryRecessive: boolean
): number | null {
  // Only expresses if both parents have the recessive allele
  if (!bothCarryRecessive) return null;
  
  // If expresses, takes higher value
  return Math.max(parentA, parentB);
}

// 4. Mutation (random, ±0.05 to ±0.15)
function applyMutation(baseValue: number): number {
  const mutationChance = 0.1; // 10% chance
  if (Math.random() > mutationChance) return baseValue;
  
  const delta = (Math.random() * 0.1 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
  return Math.max(0, Math.min(1, baseValue + delta));
}

// 5. Night School Training (bypasses genetic limits)
function nightSchoolTraining(
  baseValue: number,
  targetValue: number,
  hours: number  // 4-12 hours
): { value: number; cost: number } {
  const improvement = targetValue - baseValue;
  const maxImprovement = hours * 0.0125; // Max 0.15 at 12 hours
  
  const actualImprovement = Math.min(improvement, maxImprovement);
  const cost = Math.round(100 + (actualImprovement * 1000) + (hours * 20));
  
  return {
    value: Math.min(1, baseValue + actualImprovement),
    cost
  };
}

// 6. Hybrid Species Calculation
function calculateHybrid(parentA: Species, parentB: Species): HybridTraits {
  const size = (parentA.size + parentB.size) / 2;
  const specialties = [parentA.specialty, parentB.specialty];
  
  // Trait ranges expand for hybrids
  const traits = {};
  for (const trait of Object.keys(parentA.traits)) {
    if (parentB.traits[trait]) {
      traits[trait] = {
        min: Math.min(parentA.traits[trait].min, parentB.traits[trait].min),
        max: Math.max(parentA.traits[trait].max, parentB.traits[trait].max)
      };
    }
  }
  
  return { size, specialties, traits };
}
```

---

## Scoring Calculation Schema

### Score Calculation Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://constraint-ranch.superinstance.ai/schemas/score.json",
  "title": "PuzzleScore",
  "description": "Schema for puzzle completion scoring",
  
  "definitions": {
    "ScoreMultiplier": {
      "type": "object",
      "required": ["name", "multiplier", "applied"],
      "properties": {
        "name": { "type": "string" },
        "multiplier": { "type": "number", "minimum": 0 },
        "applied": { "type": "boolean" },
        "reason": { "type": "string" }
      }
    }
  },
  
  "type": "object",
  "required": ["puzzleId", "baseScore", "finalScore", "multipliers", "breakdown"],
  
  "properties": {
    "puzzleId": { "type": "string" },
    "playerId": { "type": "string" },
    "attemptNumber": { "type": "integer", "minimum": 1 },
    
    "baseScore": {
      "type": "object",
      "required": ["difficulty", "baseXP"],
      "properties": {
        "difficulty": { "type": "integer", "minimum": 1, "maximum": 5 },
        "baseXP": { "type": "integer", "description": "difficulty × 100" }
      }
    },
    
    "multipliers": {
      "type": "array",
      "items": { "$ref": "#/definitions/ScoreMultiplier" },
      "description": "All applicable score multipliers"
    },
    
    "bonuses": {
      "type": "object",
      "properties": {
        "firstAttempt": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "multiplier": { "type": "number", "const": 1.5 }
          }
        },
        "speedBonus": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "timeRatio": { "type": "number", "description": "actualTime / timeLimit" },
            "multiplier": { "type": "number", "minimum": 1, "maximum": 1.3 }
          }
        },
        "noHints": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "multiplier": { "type": "number", "const": 1.2 }
          }
        },
        "perfectSolution": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "multiplier": { "type": "number", "const": 1.5 }
          }
        },
        "dailyStreak": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "streakDays": { "type": "integer" },
            "multiplier": { "type": "number", "const": 1.25 }
          }
        }
      }
    },
    
    "penalties": {
      "type": "object",
      "properties": {
        "hintLevel1": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "multiplier": { "type": "number", "const": 0.9 }
          }
        },
        "hintLevel2": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "multiplier": { "type": "number", "const": 0.75 }
          }
        },
        "hintLevel3": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "multiplier": { "type": "number", "const": 0.5 }
          }
        },
        "exceededTime": {
          "type": "object",
          "properties": {
            "applied": { "type": "boolean" },
            "multiplier": { "type": "number", "const": 0.8 }
          }
        }
      }
    },
    
    "breakdown": {
      "type": "object",
      "required": ["timeTakenMs", "hintsUsed", "constraintsVerified", "solutionQuality"],
      "properties": {
        "timeTakenMs": { "type": "integer" },
        "hintsUsed": { "type": "integer", "minimum": 0, "maximum": 3 },
        "constraintsVerified": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "constraint": { "type": "string" },
              "satisfied": { "type": "boolean" },
              "value": { "type": ["number", "boolean", "string"] }
            }
          }
        },
        "solutionQuality": {
          "type": "number",
          "minimum": 0,
          "maximum": 1,
          "description": "How optimal the solution is (1.0 = perfect)"
        }
      }
    },
    
    "finalScore": {
      "type": "integer",
      "minimum": 0,
      "description": "Final score after all multipliers"
    },
    
    "experienceEarned": {
      "type": "integer",
      "minimum": 0,
      "description": "XP earned for this completion"
    },
    
    "creditsEarned": {
      "type": "integer",
      "minimum": 0,
      "description": "Ranch credits earned"
    },
    
    "completionTimestamp": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

### Scoring Formula Reference

```typescript
/**
 * Scoring Calculation Reference
 * 
 * All scores use deterministic calculation based on:
 * - Puzzle difficulty
 * - Time taken
 * - Hints used
 * - Solution quality
 */

interface ScoreInput {
  difficulty: number;       // 1-5
  timeTakenMs: number;
  timeLimitMs?: number;
  hintsUsed: number;        // 0-3
  firstAttempt: boolean;
  solutionQuality: number;  // 0-1
  dailyStreak: number;      // consecutive days
}

interface ScoreResult {
  baseScore: number;
  multiplier: number;
  finalScore: number;
  breakdown: ScoreBreakdown;
}

interface ScoreBreakdown {
  bonuses: AppliedMultiplier[];
  penalties: AppliedMultiplier[];
}

interface AppliedMultiplier {
  name: string;
  multiplier: number;
  applied: boolean;
}

function calculateScore(input: ScoreInput): ScoreResult {
  // Base score: difficulty × 100
  const baseScore = input.difficulty * 100;
  
  let multiplier = 1.0;
  const bonuses: AppliedMultiplier[] = [];
  const penalties: AppliedMultiplier[] = [];
  
  // === BONUSES ===
  
  // First attempt bonus: ×1.5
  const firstAttemptBonus = {
    name: 'first-attempt',
    multiplier: 1.5,
    applied: input.firstAttempt
  };
  bonuses.push(firstAttemptBonus);
  if (firstAttemptBonus.applied) multiplier *= 1.5;
  
  // Speed bonus: ×1.1 to ×1.3 (if time ratio < 0.5)
  if (input.timeLimitMs) {
    const timeRatio = input.timeTakenMs / input.timeLimitMs;
    const speedBonus: AppliedMultiplier = {
      name: 'speed-bonus',
      multiplier: timeRatio < 0.5 ? 1.3 : timeRatio < 0.75 ? 1.1 : 1.0,
      applied: timeRatio < 0.75
    };
    bonuses.push(speedBonus);
    if (speedBonus.applied) multiplier *= speedBonus.multiplier;
  }
  
  // No hints bonus: ×1.2
  const noHintsBonus = {
    name: 'no-hints',
    multiplier: 1.2,
    applied: input.hintsUsed === 0
  };
  bonuses.push(noHintsBonus);
  if (noHintsBonus.applied) multiplier *= 1.2;
  
  // Perfect solution bonus: ×1.5
  const perfectBonus = {
    name: 'perfect-solution',
    multiplier: 1.5,
    applied: input.solutionQuality >= 1.0
  };
  bonuses.push(perfectBonus);
  if (perfectBonus.applied) multiplier *= 1.5;
  
  // Daily streak bonus: ×1.25
  const streakBonus = {
    name: 'daily-streak',
    multiplier: 1.25,
    applied: input.dailyStreak >= 3
  };
  bonuses.push(streakBonus);
  if (streakBonus.applied) multiplier *= 1.25;
  
  // === PENALTIES ===
  
  // Hint penalties (cumulative based on highest hint used)
  const hintPenalties: AppliedMultiplier[] = [
    { name: 'hint-level-3', multiplier: 0.5, applied: input.hintsUsed >= 3 },
    { name: 'hint-level-2', multiplier: 0.75, applied: input.hintsUsed === 2 },
    { name: 'hint-level-1', multiplier: 0.9, applied: input.hintsUsed === 1 }
  ];
  
  const highestHintPenalty = hintPenalties.find(p => p.applied);
  if (highestHintPenalty) {
    penalties.push(...hintPenalties.filter(p => p.applied));
    multiplier *= highestHintPenalty.multiplier;
  }
  
  // Time exceeded penalty: ×0.8
  if (input.timeLimitMs && input.timeTakenMs > input.timeLimitMs) {
    const timePenalty = {
      name: 'exceeded-time',
      multiplier: 0.8,
      applied: true
    };
    penalties.push(timePenalty);
    multiplier *= 0.8;
  }
  
  // Calculate final score (rounded down)
  const finalScore = Math.floor(baseScore * multiplier);
  
  return {
    baseScore,
    multiplier,
    finalScore,
    breakdown: { bonuses, penalties }
  };
}

// Example calculations:
// 
// Difficulty 3 puzzle, first attempt, 30% time, no hints, perfect solution, 5-day streak:
// base = 300
// multiplier = 1.5 × 1.3 × 1.2 × 1.5 × 1.25 = 4.3875
// final = 300 × 4.3875 = 1316 XP
//
// Difficulty 5 puzzle, retry, 60% time, hint level 2 used, 0.9 quality:
// base = 500
// multiplier = 1.1 × 0.75 = 0.825
// final = 500 × 0.825 = 412 XP
```

### XP Range by Difficulty

| Difficulty | Base XP | Min XP | Max XP |
|------------|---------|--------|--------|
| 1 | 100 | 50 (all penalties) | 366 (all bonuses) |
| 2 | 200 | 100 | 732 |
| 3 | 300 | 150 | 1098 |
| 4 | 400 | 200 | 1464 |
| 5 | 500 | 250 | 1830 |

---

*This schema specification ensures consistent data validation across all Constraint Ranch components.*
