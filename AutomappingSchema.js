const fs = require('fs');
const fuzz = require('fuzzball');
const sourceFields = {
    EmployeeID: 'INT',
    FirstName: 'VARCHAR(50)',
    LastName: 'VARCHAR(50)',
    Email: 'VARCHAR(100)',
    Age: 'INT',
    DateOfBirth: 'DATE',
    Salary: 'DECIMAL(10',
    IsActive: 'BOOLEAN',
    ProfilePicture: 'BLOB',
    DepartmentID: 'INT',
    JoinDate: 'DATETIME'
  };
  const destinationFields = {
    EmpID: 'INT',
    FiName: 'VARCHAR(50)',
    FName: 'VARCHAR(50)',
    Email: 'VARCHAR(100)',
    Age: 'INT',
    DOB: 'DATE',
    Salary: 'DECIMAL(10)',
    IsActive: 'BOOLEAN',
    ProfilePicture: 'BLOB',
    DepartmentID: 'INT',
    JoinDate: 'DATETIME',
    LName: 'VARCHAR(50)'
  }


// Read and parse the file
function parseFieldsFromFile(filename) {
    const sourceFields = {};
    const destinationFields = {};
    let currentSection = null;

    const fileContent = fs.readFileSync(filename, 'utf-8');
    const lines = fileContent.split('\n');

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('Source')) {
            currentSection = 'source';
        } else if (line.startsWith('Destination')) {
            currentSection = 'destination';
        } else if (line === '{' || line === '}') {
            return; // Skip these lines
        } else if (line.includes(' ')) {
            const [field, fieldType] = line.split(' ');
            const fieldName = field.replace(',', '');
            const cleanFieldType = fieldType.replace(',', '');

            if (currentSection === 'source') {
                sourceFields[fieldName] = cleanFieldType;
            } else if (currentSection === 'destination') {
                destinationFields[fieldName] = cleanFieldType;
            }
        }
    });
    console.log(sourceFields);
    return { sourceFields, destinationFields };
}

// Perform field matching
function matchFields(sourceFields, destinationFields) {
    const output = {};

    for (const [field1, type1] of Object.entries(sourceFields)) {
        let bestMatches = [];
        let bestScore = -1;

        for (const [field2, type2] of Object.entries(destinationFields)) {
            if (type1 === type2) {
                const score = fuzz.partial_ratio(field1, field2);
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMatches = [field2];
                } else if (score === bestScore) {
                    bestMatches.push(field2);
                }
            }
        }
        
        output[field1] = bestMatches;
    }

    return output;
}

// Refine matching using token sort ratio
function refineMatches(output) {
    const output2 = {};

    for (const [field1, matches] of Object.entries(output)) {
        let refinedMatch = null;
        let bestScore = -1;

        for (const candidate of matches) {
            const score = fuzz.token_sort_ratio(field1, candidate);
            
            if (score > bestScore) {
                bestScore = score;
                refinedMatch = candidate;
            }
        }

        if (refinedMatch) {
            output2[field1] = [refinedMatch];
        }
    }

    return output2;
}

// Main execution
function main() {
    // Parser in case of Schema loaded from Separate File ( Sample.txt)
    // const { sourceFields, destinationFields } = parseFieldsFromFile('Sample.txt');
    
    /*
    Fetch values from the RDS table / S3 / file and 
    map into object sourceFields : {} , destinationFields : {}
    Check headers inn the file
    */ 
    console.log("Source Fields:");
    console.log(sourceFields);
    
    console.log("\nDestination Fields:");
    console.log(destinationFields);

    const output = matchFields(sourceFields, destinationFields);
    
    console.log("\nOutput using partial_ratio:");
    console.log(output);

    //const output2 = refineMatches(sourceFields, destinationFields);
    const output2 = refineMatches(output);
    
    console.log("\nAuto mapped Output using token_sort_ratio:");
    console.log(output2);
}

// Run the script
main();