let rls = require('readline-sync');
const fs = require('fs');
let map = fs.readFileSync('map.txt','utf-8');
map=map.split("\r\n")
let mapMatrix=[];
let row=[];
let mapDisplay=[];
let missiles=30; // as per the ques. details we have 30 missiles
let coordinates="";
let hit=5; // as per the ques. details we have to make hit=5 to win
console.log("LET'S PLAY BATTLESHIP!!");
console.log("You have 30 missles to fire to sink all five ships");
//Converting and storing the map file content into a 2d matrix
for(let i=0;i<map.length;i++)
{
    row=map[i].split(",");
    mapMatrix[i]=[];
    mapDisplay[i]=[]
    for(let j=0;j<row.length;j++)
    {
        mapMatrix[i][j]=row[j];
        mapDisplay[i][j]="  "
    }
}



function Displaymap()
{
let maprow=0;
for(let col=0;col<mapMatrix.length;col++)
    {    if (col==0)
        { process.stdout.write(" ");}        
        process.stdout.write(String.fromCharCode('A'.charCodeAt() + col)+" ")
        if(col==mapMatrix.length-1)
        {    process.stdout.write('\n');    }

    }
for(let row=0;row<mapMatrix.length;row++)
{    maprow=row+1;
    maprow=maprow.toString()  
     process.stdout.write(maprow);
     
    for(let col=0;col<mapMatrix.length;col++)
    { 
       process.stdout.write(mapDisplay[row][col]);
    }
    //we are at the end of a row
    process.stdout.write('\n');
}
}


function Check(str)
{
const regex = /[^-_, \d]+|\d+/g;
let result = str.match(regex);
result[0] = parseInt(result[0].toLowerCase().charCodeAt(0) - 97 + 1);
result[0]-=1;
result[1]-=1;
if(result[1]<=mapMatrix.length && result[0]<=mapMatrix.length && result[1]>=0 && result[0]>=0)
{
if(mapMatrix[result[1]][result[0]]==0)
{ console.log("Miss");
mapDisplay[result[1]][result[0]]="o ";
missiles--;
}
if(mapMatrix[result[1]][result[0]]==1)
{ console.log("Hit!!!!");
mapDisplay[result[1]][result[0]]="x ";
hit--;
missiles--;
}
}
else{console.log("Invalid coordinate");}

}

while (missiles>0 && hit!=0)
{
    Displaymap();
    coordinates=rls.question("Choose your target (Ex: A1):");
    Check(coordinates);
    console.log("You have",missiles,"misiles remaining");

}
if(hit==0)
{
    console.log("YOU SANK MY ENTIRE FLEET!");
}
else if(hit!=0)
{
    console.log("Sorry you were unable to sink all 5 ships \nbetter luck next time");
}



