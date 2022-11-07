import React from 'react';
import renderer from 'react-test-renderer';
import App from "../src/App"

test("Render Correctly", () =>{
    const tree = renderer.create(<App></App>).toJSON();
    expect(tree).toMatchSnapshot();
})