import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow, ShallowWrapper } from "enzyme";
import Toolbar, { ToolbarUnhandledProps } from "./toolbar";
import {
    keyCodeArrowDown,
    keyCodeArrowLeft,
    keyCodeArrowRight,
    keyCodeArrowUp,
} from "@microsoft/fast-web-utilities";
import { DisplayNamePrefix } from "../utilities";
import { Orientation } from "@microsoft/fast-web-utilities";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("toolbar", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(Toolbar as any).name}`).toBe(Toolbar.displayName);
    });

    test("should have correct role attribute 'toolbar'", () => {
        const rendered: ShallowWrapper = shallow(<Toolbar />);
        expect(rendered.first().prop("role")).toBe("toolbar");
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<Toolbar />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: ToolbarUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<Toolbar {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });

    test("should not have a focusIndex if no children are focusable", (): void => {
        const rendered: any = mount(
            <Toolbar>
                <div>hello world</div>
            </Toolbar>
        );

        expect(rendered.state("focusIndex")).toBe(-1);
    });

    test("should set focusIndex to the first focusable element on mount", (): void => {
        const rendered: any = mount(
            <Toolbar>
                <div>not a focusable element</div>
                <div role="menuitem">focusable element</div>
            </Toolbar>
        );

        expect(rendered.state("focusIndex")).toBe(1);
    });

    test("should move focus down when the down arrow is pressed in vertical mode", (): void => {
        const rendered: any = mount(
            <Toolbar orientation={Orientation.vertical}>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </Toolbar>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: keyCodeArrowDown });

        expect(rendered.state("focusIndex")).toBe(1);
    });

    test("should not move focus down when the down arrow is pressed in horizontal mode", (): void => {
        const rendered: any = mount(
            <Toolbar orientation={Orientation.horizontal}>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </Toolbar>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: keyCodeArrowDown });

        expect(rendered.state("focusIndex")).toBe(0);
    });

    test("should move focus right when the right arrow is pressed in horizontal mode", (): void => {
        const rendered: any = mount(
            <Toolbar orientation={Orientation.horizontal}>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </Toolbar>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: keyCodeArrowRight });

        expect(rendered.state("focusIndex")).toBe(1);
    });

    test("should not move focus right when the right arrow is pressed in vertical mode", (): void => {
        const rendered: any = mount(
            <Toolbar orientation={Orientation.vertical}>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </Toolbar>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: keyCodeArrowRight });

        expect(rendered.state("focusIndex")).toBe(0);
    });

    test("should move focus up when the up arrow is pressed in vertical mode", (): void => {
        const rendered: any = mount(
            <Toolbar orientation={Orientation.vertical} initialFocusIndex={1}>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </Toolbar>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: keyCodeArrowUp });

        expect(rendered.state("focusIndex")).toBe(0);
    });

    test("should not move focus up when the up arrow is pressed in horizontal mode", (): void => {
        const rendered: any = mount(
            <Toolbar orientation={Orientation.horizontal} initialFocusIndex={1}>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </Toolbar>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: keyCodeArrowUp });

        expect(rendered.state("focusIndex")).toBe(1);
    });

    test("should move focus left when the left arrow is pressed in horizontal mode", (): void => {
        const rendered: any = mount(
            <Toolbar orientation={Orientation.horizontal} initialFocusIndex={1}>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </Toolbar>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: keyCodeArrowLeft });

        expect(rendered.state("focusIndex")).toBe(0);
    });

    test("should not move focus left when the right arrow is pressed in vertical mode", (): void => {
        const rendered: any = mount(
            <Toolbar orientation={Orientation.vertical} initialFocusIndex={1}>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </Toolbar>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: keyCodeArrowLeft });

        expect(rendered.state("focusIndex")).toBe(1);
    });
});