let width = 100, height = 5;


function calculateArea (width, height) {

return width + height;
}

let area = calculateArea(width, height);

if (area > 100) {
    console.log ("The area is large.");
} else {
    console.log ("The area is small.");
}

if (width + height > 100) {
    console.log ("Area is greater than or equal to 100");
}