// Copyright (c) 2009-2020 SAP SE, All Rights Reserved

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/thirdparty/jquery",
    "sap/base/Log",
    "sap/base/util/ObjectPath",
    "sap/ushell/components/applicationIntegration/AppLifeCycle",
    "sap/ushell/ui/shell/ShellHeadItem",
    "sap/m/NotificationListItem",
    "sap/ushell/ui/shell/ToolAreaItem"
], function (
    UIComponent,
    jQuery,
    Log,
    ObjectPath,
    AppLifeCycle,
    ShellHeadItem,
    NotificationListItem,
    ToolAreaItem
) {
    "use strict";

    /* eslint-disable no-undef */ // TODO: remove eslint-disable

    /**
     * Default renderer for SAP Fiori launchpad.<br><br>
     * Publishes all lifecycle events as described in the documentation of the "sap.ushell" namepsace.
     */

    /**
     * This method MUST be called by the Unified Shell's container only, others MUST call
     * <code>sap.ushell.Container.createRenderer("fiori2", true)</code>.
     *
     * @class The SAPUI5 component of SAP Fiori Launchpad renderer for the Unified Shell.
     *
     * @extends sap.ui.core.UIComponent
     * @alias sap.ushell.renderers.fiori2.Renderer
     * @since 1.15.0
     * @public
     */
    var API = UIComponent.extend("sap.ushell.components.applicationIntegration.API", {
        metadata: {
            version: "1.97.1",
            dependencies: {
                version: "1.97.1",
                libs: ["sap.ui.core", "sap.m"],
                components: []
            }
        }
    });

    /**
     * @returns {object} an instance of Shell view
     *
     * @since 1.15.0
     *
     * @private
     */
    API.prototype.createContent = function () {
        this.oShellModel = AppLifeCycle;
    };

    /*-------------------------------------------Shells Extensions----------------------------*/

    /**
     * Creates an extended shell state<br>
     * Creates an extension for the current shell that can be applied by the function applyExtendedShellState.<br>
     *
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").createCustomShell('test1', function () {
     *      var oTileActionsButton = sap.ushell.Container.getRenderer("fiori2").addActionButton("sap.ushell.ui.launchpad.ActionItem",{
     *      id: "xxx2",
     *      text: 'aaaaaaaaaaaa',
     *      icon: 'sap-icon://edit',
     *      tooltip: sap.ushell.resources.i18n.getText("activateActionMode"),
     *      press: function () {
     *         sap.ushell.components.homepage.ActionMode.toggleActionMode(oModel, "Menu Item");
     *        }
     *      }, true, true);
     *   });
     * </pre>
     *
     * @param {String[]} sShellName
     *   Name of the extended shell state<br>
     *
     * @param {function} fnCreationInstructions
     *   Contained shell api commands for creating the extension.<br>
     *
     * @param {String[]} aStates
     *   (Valid only if bCurrentState is <code>false</code>)<br>
     *   A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the controls are added.<br>
     *   If no launchpad state is provided the controls are added in all states.
     *   @see LaunchpadState.<br>
     *
     * @since 1.35
     *
     * @private
     */
    API.prototype.createExtendedShellState = function (sShellName, fnCreationInstructions) {
        // create a shadow shell, shell will extend custom shell state.
        //place it in the custome shell hash.
        return this.oShellModel.createExtendedShellState(sShellName, fnCreationInstructions);

    };

    /**
     * Set the extended shell to be active<br>
     * This function changes the shell state to display the extended shell merged with the current shell.<br>
     *
     * <b>Example:</b>
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").createCustomShell('test1', function () {
     *      var oTileActionsButton = sap.ushell.Container.getRenderer("fiori2").addActionButton("sap.ushell.ui.launchpad.ActionItem",{
     *      id: "xxx2",
     *      text: 'aaaaaaaaaaaa',
     *      icon: 'sap-icon://edit',
     *      tooltip: sap.ushell.resources.i18n.getText("activateActionMode"),
     *      press: function () {
     *         sap.ushell.components.homepage.ActionMode.toggleActionMode(oModel, "Menu Item");
     *        }
     *      }, true, true);
     *   });
     *   sap.ushell.Container.getRenderer("fiori2").setCustomShell('test1');
     * </pre>
     *
     * @param {String[]} sShellName
     *   Name of the extended shell state<br>
     *
     * @param {function} fnCustomMerge
     *   aaaa.<br>
     *
     * @since 1.35
     *
     * @private
     */
    API.prototype.applyExtendedShellState = function (sShellName, fnCustomMerge) {
        //merge the current shell state state (HOME/APP) with the custome shell.
        this.oShellModel.applyExtendedShellState(sShellName, fnCustomMerge);
    };

    /*-------------------------------------------show----------------------------*/

    /**
     * Sets the content of the left pane in Fiori launchpad, in the given launchpad states
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).</br>
     * If no launchpad state is provided the content is added in all states.
     *
     * <b>Example:</b>
     * <pre>
     *   var button1 = new sap.m.Button(id: "newButton", text: "Test Button");
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showActionButton ([button1.getId()], false, ["home", "app"]);
     * </pre>
     *
     * @param {String[]} aIds
     *   List of ID elements to add to the shell.
     *
     * @param {boolean} bCurrentState
     *   bCurrentState – if true, add the current component only to the current instance of the rendering of the shell.
     *   if false, add the component to the LaunchPadState itself.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState in which to add the aIds.
     *
     * @since 1.30
     *
     * @private
     */
    API.prototype.showLeftPaneContent = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.addLeftPaneContent([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.addLeftPaneContent(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Creates and displays one or more HeaderItem controls according to the given control IDs and Shell states<br>
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).<br><br>
     * The HeaderItem controls will be displayed on the left side of the Fiori Launchpad shell header according to the given display parameters.<br>
     * There can be up to three header items. If the number of existing header items plus the given ones exceeds 3, then the operation fails and no new header items are created.<br>
     *
     * <b>Example:</b>
     * <pre>
     *   var button1 = new sap.ushell.ui.shell.ShellHeadItem();
     *   var button2 = new sap.ushell.ui.shell.ShellHeadItem();
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showHeaderItem ([button1.getId(), button2.getId()], false, ["home", "app"]);
     * </pre>
     *
     * @param {String[]} aIds
     *   IDs Array of headerItem controls that should be added to the shell header<br>
     *
     * @param {boolean} bCurrentState
     *   If <code>true</code> then the new created controls are added to the current rendered shell state.<br>
     *   When the user navigates to another application (including the Home page) then the controls will be removed.<br>
     *   If <code>false</code> then the controls are added to the LaunchPadState itself.<br>
     *
     * @param {String[]} aStates
     *   (Valid only if bCurrentState is <code>false</code>)<br>
     *   A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the controls are added.<br>
     *   If no launchpad state is provided the controls are added in all states.
     *   @see LaunchpadState.<br>
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.showHeaderItem = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.addHeaderItem([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.addHeaderItem(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Displays RightFloatingContainerItem on the left side of the Fiori launchpad shell, in the given launchpad states
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).</br>
     * If no launchpad state is provided the content is displayed in all states.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var button1 = new sap.ushell.ui.shell.RightFloatingContainerItem();
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showRightFloatingContainerItem(button1.getId(), false, ["home", "app"]);
     * </pre>
     *
     * @param {string} sId
     *   ID of the element to add to the Tool Area.
     *
     * @param {boolean} bCurrentState
     *   if true, add the current RightFloatingContainerItems only to the current instance of the rendering of the shell.
     *   if false, add the RightFloatingContainerItems to the LaunchPadState itself.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState in which to add the aIds.
     *
     * @since 1.37
     *
     * @private
     */
    API.prototype.showRightFloatingContainerItem = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.addRightFloatingContainerItem([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.addRightFloatingContainerItem(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Displays RightFloatingContainerItem on the right side of the Fiori launchpad shel.
     *
     * <b>Example:</b>
     * <pre>
     *   var oRightFloatingContainer = new sap.ushell.ui.shell.RightFloatingContainer();
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showRightFloatingContainer(true);
     * </pre>
     *
     * @param {boolean} bShow
     *   Defines whether to show or hide the
     *
     *
     * @since 1.37
     *
     * @private
     */
    API.prototype.showRightFloatingContainer = function (bShow) {
        this.oShellModel.showRightFloatingContainer(bShow);
    };

    /**
     * Displays ToolAreaItem on the left side of the Fiori launchpad shell, in the given launchpad states
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).</br>
     * If no launchpad state is provided the content is displayed in all states.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var button1 = new sap.ushell.ui.shell.ToolAreaItem();
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showToolAreaItem(button1.getId(), false, ["home", "app"]);
     * </pre>
     *
     * @param {string} sId
     *   ID of the element to add to the Tool Area.
     *
     * @param {boolean} bCurrentState
     *   if true, add the current ToolAreaItems only to the current instance of the rendering of the shell.
     *   if false, add the ToolAreaItems to the LaunchPadState itself.
     *
     * @param {String[]} aStates+
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState in which to add the aIds.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.showToolAreaItem = function (sId, bCurrentState, aStates) {
        this.oShellModel.addToolAreaItem(sId, bCurrentState, aStates);
    };

    /**
     * Displays action buttons in the options bar of the Me Area in the SAP Fiori launchpad, in the given launchpad states (LaunchpadState).
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).</br>
     * If no launchpad state is provided the content is displayed in all states.</br>
     * The user actions menu is opened via the button on the right hand side of the shell header.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var button1 = new sap.m.Button();
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showActionButton([button1.getId()], false, ["home", "app"]);
     * </pre>
     *
     * @param {String[]} aIds
     *   List of ID elements to that should be added to the Me Area options bar.
     *
     * @param {boolean} bCurrentState
     *   If true, add the created control to the current rendered shell state. When the user navigates to a
     *   different state, or to a different application, then the control is removed. If false, the control is added to the LaunchpadState.
     *
     * @param {String[]} aStates
     *   List of the launchpad states (sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which to add the aIds. Valid only if bCurrentState is set to false.
     *   @see sap.ushell.renderers.fiori2.renderer.LaunchpadState.
     *   If no launchpad state is provided, the content is added in all states.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.showActionButton = function (aIds, bCurrentState, aStates) {
        var aButtons = [],
            aActions = [],
            oButton;
        if (typeof aIds === "string") {
            aIds = [aIds];
        }
        //In case the method was called with instance of sap.m.Button, we need to convert it to
        //sap.ushell.ui.launchpad.ActionItem in order to apply the action item behavior and styles to this control
        aButtons = aIds.filter(function (sId) {
            oButton = sap.ui.getCore().byId(sId);
            return oButton instanceof sap.m.Button && !(oButton instanceof sap.ushell.ui.launchpad.ActionItem);
        });
        aActions = aIds.filter(function (sId) {
            oButton = sap.ui.getCore().byId(sId);
            return oButton instanceof sap.ushell.ui.launchpad.ActionItem;
        });
        if (aButtons.length) {
            this.convertButtonsToActions(aButtons, bCurrentState, aStates);
        }
        if (aActions.length) {
            this.oShellModel.addActionButton(aActions, bCurrentState, aStates);
        }
    };

    /**
     * Displays FloatingActionButton on the bottom right corner of the Fiori launchpad, in the given launchpad states.
     * The FloatingActionButton is rendered in the bottom right corner of the shell.</br>
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).</br>
     * If no launchpad state is provided the content is displayed in all states.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var button1 = new sap.ushell.ui.shell.ShellFloatingAction();
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showFloatingActionButton([button1.getId()], true);
     * </pre>
     *
     * @param {String[]} aIds
     *   List of ID elements to add to the user actions menu.
     *
     * @param {boolean} bCurrentState
     *   if true, add the current Buttons only to the current instance of the rendering of the shell.
     *   if false, add the Buttons to the LaunchPadState itself.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState in which to add the aIds.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.showFloatingActionButton = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.addFloatingActionButton([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.addFloatingActionButton(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Displays HeaderItems on the right side of the Fiori launchpad shell header, in the given launchpad states
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).</br>
     * If no launchpad state is provided the content is displayed in all states.</br>
     * The shell header can display the user HeaderItem, and just one more HeaderItem.</br>
     * If this method is called when the right side of the header is full, this method will not do anything.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var button1 = new sap.ushell.ui.shell.ShellHeadItem();
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showHeaderEndItem ([button1.getId()], false, ["home", "app"]);
     * </pre>
     *
     * @param {String[]} aIds
     *   List of ID elements to add to the shell header.
     *
     * @param {boolean} bCurrentState
     *   if true, add the current HeaderItems only to the current instance of the rendering of the shell.
     *   if false, add the HeaderItems to the LaunchPadState itself.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState in which to add the aIds.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.showHeaderEndItem = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.addHeaderEndItem([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.addHeaderEndItem(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Sets the header visibility accrding to the given value and shell states.<br>
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).<br><br>
     *
     * <b>Example:</b>
     * <pre>
     *   var oRenderer = sap.ushell.Container.getRenderer("fiori2");
     *   oRenderer.setHeaderVisibility(false, false, ["home", "app"]);
     * </pre>
     *
     * @param {boolean} bVisible
     *   The visibility of the header<br>
     *
     * @param {boolean} bCurrentState
     *   If <code>true</code> then the visibility is set only to the current rendered shell state.<br>
     *   When the user navigates to another application (including the Home page) then the visibility flag is reset.<br>
     *   If <code>false</code> then set the visibility according to the states provided in the aState parameter.<br>
     *
     * @param {String[]} aStates
     *   (Valid only if bCurrentState is <code>false</code>)<br>
     *   A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the header visibility flag should be set.<br>
     *   If no launchpad state is provided the visibility flag is set for all states.
     *   @see LaunchpadState.<br>
     *
     * @since 1.38
     *
     * @public
     */
    API.prototype.setHeaderVisibility = function (bVisible, bCurrentState, aStates) {
        this.oShellModel.setHeaderVisibility(bVisible, bCurrentState, aStates);
    };

    /**
     * Displays one or more sub header controls according to the given control IDs and shell states.<br>
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).<br><br>
     * A sub header is placed in a container, located directly below the main Fiori launchpad shell header.<br>
     *
     * <b>Example:</b>
     * <pre>
     *   var bar = new sap.m.Bar({id: "testBar", contentLeft: [new sap.m.Button({text: "Test SubHeader Button",
     *   press: function () {
     *   sap.m.MessageToast.show("Pressed");
     *   }})
     *   ]});
     *   var oRenderer = sap.ushell.Container.getRenderer("fiori2");
     *   oRenderer.showSubHeader([bar.getId()], false, ["home", "app"]);
     * </pre>
     *
     * @param {String[]} aIds
     *   Array of sub header control IDs to be added<br>
     *
     * @param {boolean} bCurrentState
     *   If <code>true</code> then the new created controls are added only to the current rendered shell state.<br>
     *   When the user navigates to another application (including the Home page) then the controls will be removed.<br>
     *   If <code>false</code> then add the control to the LaunchPadState itself.<br>
     *
     * @param {String[]} aStates
     *   (Valid only if bCurrentState is <code>false</code>)<br>
     *   A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the controls are added.<br>
     *   If no launchpad state is provided the controls are added in all states.
     *  @see LaunchpadState.<br>
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.showSubHeader = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.addSubHeader([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.addSubHeader(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Displays Sign Out button in Me Area in the given launchpad state
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).</br>
     * If no launchpad state is provided the item is displayed in all states.</br>
     * If this method is called when the sign out button already displayed, this method will not do anything.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showSignOutItem (false, ["home", "app"]);
     * </pre>
     *
     * @param {boolean} bCurrentState
     *   if true, add the sign out button only to the current instance of the rendering of the shell.
     *   if false, add the sign out button to the LaunchPadState itself.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState in which to add the aIds.
     *
     * @since 1.44
     *
     * @private
     */
    API.prototype.showSignOutItem = function (bCurrentState, aStates) {
        this.oShellModel.showSignOutButton(bCurrentState, aStates);
    };

    /**
     * Displays Settings button in Me Area in the given launchpad state
     * (see sap.ushell.renderers.fiori2.renderer.LaunchpadState).</br>
     * If no launchpad state is provided the item is displayed in all states.</br>
     * If this method is called when the sign out button already displayed, this method will not do anything.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var renderer = sap.ushell.Container.getRenderer("fiori2");
     *   renderer.showSettingsItem (false, ["home", "app"]);
     * </pre>
     *
     * @param {boolean} bCurrentState
     *   if true, add the settings button only to the current instance of the rendering of the shell.
     *   if false, add settings button to the LaunchPadState itself.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.renderer.LaunchpadState in which to add the aIds.
     *
     * @since 1.44
     *
     * @private
     */
    API.prototype.showSettingsItem = function (bCurrentState, aStates) {
        this.oShellModel.showSettingsButton(bCurrentState, aStates);
    };

    /*--------------------------Hide ----------------------------------*/

    /**
     * Hide the given sap.ushell.ui.shell.ShellHeadItem from Fiori Launchpad, in the given launchpad states.
     * The removed control will not be destroyed.<br><br>
     * This API is meant to be used for implementing custom elements in the SAP Fiori launchpad.
     * We do not recommend using it on a standard launchpad element, as this may interfere with the standard
     * launchpad functionality.
     *
     * @param {String[]} aIds
     *   the Ids of the sap.ushell.ui.shell.ShellHeadItem to remove.
     *
     * @param {boolean} bCurrentState
     *   if true, remove the current control only from the current rendered shell state.
     *
     * @param {String[]} aStates
     *   list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control.(Only valid if bCurrentState is set to false)
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is removed in all states.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.hideHeaderItem = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeHeaderItem([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeHeaderItem(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Remove the given Tool Area Item from Fiori Launchpad, in the given launchpad states.<br><br>
     * This API is meant to be used for implementing custom elements in the SAP Fiori launchpad.
     * We do not recommend using it on a standard launchpad element, as this may interfere with the standard
     * launchpad functionality.
     *
     * @param {String[]} aIds
     *   the Ids of the sap.ushell.ui.shell.ToolAreaItem control to remove.
     *
     * @param {boolean} bCurrentState
     *   if true, remove the current control only from the current rendered shell state.
     *
     * @param {String[]} aStates
     *   list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control.(Only valid if bCurrentState is set to false)
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is removed in all states.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.removeToolAreaItem = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeToolAreaItem([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeToolAreaItem(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Remove the given Tool Area Item from Fiori Launchpad, in the given launchpad states.
     *
     * @param {String[]} aIds
     *   the Ids of the sap.ushell.ui.shell.RightFloatingContainerItem control to remove.
     *
     * @param {boolean} bCurrentState
     *   if true, remove the current control only from the current rendered shell state.
     *
     * @param {String[]} aStates
     *   list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control.(Only valid if bCurrentState is set to false)
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is removed in all states.
     *
     * @since 1.30
     *
     * @private
     */
    API.prototype.removeRightFloatingContainerItem = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeRightFloatingContainerItem([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeRightFloatingContainerItem(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Hides an action button from the options bar of the Me Area in the SAP Fiori launchpad, in the given launchpad states (LaunchpadState). The removed button will not be destroyed.<br><br>
     * This API is meant to be used for custom elements in the SAP Fiori launchpad. We do not recommend using it on
     * standard launchpad elements, as this may interfere with the standard launchpad functionality.
     *
     * @param {String[]} aIds
     *   IDs of the button controls that should hidden.
     *
     * @param {boolean} bCurrentState
     *   If true, removes the current control only from the current rendered shell state.
     *
     * @param {String[]} aStates
     *   A list of the launchpad states in which to hide the control. Valid only if bCurrentState is set to false.
     *   @see sap.ushell.renderers.fiori2.renderer.LaunchpadState.
     *   If no launchpad state is provided, the content is hidden in all states.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.hideActionButton = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeActionButton([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeActionButton(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Hide the given control from Fiori Launchpad, in the given launchpad states.
     * The removed control will not be destroyed.<br><br>
     * This API is meant to be used for implementing custom elements in the SAP Fiori launchpad.
     * We do not recommend using it on a standard launchpad element, as this may interfere with the standard
     * launchpad functionality.
     *
     * @param {String[]} aIds
     *   the Ids of the controls to remove.
     *
     * @param {boolean} bCurrentState
     *   if true, remove the current control only from the current rendered shell state.
     *
     * @param {String[]} aStates
     *   list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control.(Only valid if bCurrentState is set to false)
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is removed in all states.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.hideLeftPaneContent = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeLeftPaneContent([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeLeftPaneContent(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Hide the given sap.ushell.ui.shell.ShellFloatingAction from Fiori Launchpad, in the given launchpad states.
     * The removed control will not be destroyed.<br><br>
     * This API is meant to be used for implementing custom elements in the SAP Fiori launchpad.
     * We do not recommend using it on a standard launchpad element, as this may interfere with the standard
     * launchpad functionality.
     *
     * @param {String[]} aIds
     *   the Ids of the sap.ushell.ui.shell.ShellFloatingAction to remove.
     *
     * @param {boolean} bCurrentState
     *   if true, remove the current control only from the current rendered shell state.
     *
     * @param {String[]} aStates
     *   list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control.(Only valid if bCurrentState is set to false)
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is removed in all states.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.hideFloatingActionButton = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeFloatingActionButton([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeFloatingActionButton(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Hide the given sap.ushell.ui.shell.ShellHeadItem from Fiori Launchpad, in the given launchpad states.
     * The removed control will not be destroyed.<br><br>
     * This API is meant to be used for implementing custom elements in the SAP Fiori launchpad.
     * We do not recommend using it on a standard launchpad element, as this may interfere with the standard
     * launchpad functionality.
     *
     * @param {String[]} aIds
     *   the Ids of the sap.ushell.ui.shell.ShellHeadItem to remove.
     *
     * @param {boolean} bCurrentState
     *   if true, remove the current control only from the current rendered shell state.
     *
     * @param {String[]} aStates
     *   list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control.(Only valid if bCurrentState is set to false)
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is removed in all states.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.hideHeaderEndItem = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeHeaderEndItem([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeHeaderEndItem(aIds, bCurrentState, aStates);
        }
    };

    /**
     * Hide the given control from the Fiori Launchpad sub header, in the given launchpad states.
     * The removed control will not be destroyed.<br><br>
     * This API is meant to be used for implementing custom elements in the SAP Fiori launchpad.
     * We do not recommend using it on a standard launchpad element, as this may interfere with the standard
     * launchpad functionality.
     *
     * @param {String[]} aIds
     *   the Ids of the controls to remove.
     *
     * @param {boolean} bCurrentState
     *   if true, remove the current control only from the current rendered shell state.
     *
     * @param {String[]} aStates
     *   list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to remove the control.(Only valid if bCurrentState is set to false)
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is removed in all states.
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.hideSubHeader = function (aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeSubHeader([aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeSubHeader(aIds, bCurrentState, aStates);
        }
    };

    /*------------------------------------------------ Adding controls functionality ------------------------------------------*/

    /**
     * Creates and displays a sub header control in Fiori launchpad, in the given launchpad states.<br>
     * The new control is displayed in FLP UI according to the given display parameters.<br>
     * If a sub header already exists, the new created one will replace the existing one.<br><br>
     *
     * <b>Example:</b>
     * <pre>
     *   var oRenderer = sap.ushell.Container.getRenderer("fiori2"),
     *     oAddSubHeaderProperties = {
     *       controlType : "sap.m.Bar",
     *       oControlProperties : {
     *         id: "testBar",
     *         contentLeft: [new sap.m.Button({
     *           text: "Test SubHeader Button",
     *           press: function () {
     *             sap.m.MessageToast.show("Pressed");
     *           }
     *         })
     *       },
     *       true,
     *       true
     *     };
     *   oRenderer.addShellSubHeader(oAddSubHeaderProperties);
     * </pre>
     *
     * @param {object} oParameters<br>
     *   Contains the required parameters for creating and showing the new control object:<br>
     *   Properties:<br>
     *    - {string} controlType<br>
     *        The (class) name of the control type to create.<br>
     *    - {object} oControlProperties<br>
     *        The properties that will be passed to the created control.<br>
     *    - {boolean} bIsVisible<br>
     *        Specify whether to display the control.<br>
     *    - {boolean} bCurrentState<br>
     *        If true, add the current control only to the current rendered shell state.<br>
     *      Once the user navigates to another app or back to the Home page, this control will be removed.<br>
     *    - {String[]} aStates<br>
     *        (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.<br>
     *
     * @returns {object} jQuery.deferred.promise object that when resolved, returns the newly created control
     *
     * @since 1.48
     *
     * @public
     */
    API.prototype.addShellSubHeader = function (oParameters) {
        var oDeferred = new jQuery.Deferred(),
            that = this,
            sControlResource,
            oControlInstance,
            controlType = oParameters.controlType,
            oControlProperties = oParameters.oControlProperties,
            bIsVisible = oParameters.bIsVisible,
            bCurrentState = oParameters.bCurrentState,
            aStates = oParameters.aStates;

        // If a control instance is already created - get it by its id
        if (oControlProperties && oControlProperties.id && sap.ui.getCore().byId(oControlProperties.id)) {
            oControlInstance = sap.ui.getCore().byId(oControlProperties.id);
            if (oControlInstance) {
                if (bIsVisible) {
                    this.showSubHeader(oControlInstance.getId(), bCurrentState, aStates);
                }
                oDeferred.resolve(oControlInstance);
            }
        }
        if (controlType) {
            sControlResource = controlType.replace(/\./g, "/");
            sap.ui.require([sControlResource],
                function (oControlObject) {
                    oControlInstance = new oControlObject(oControlProperties);
                    if (bIsVisible) {
                        that.showSubHeader(oControlInstance.getId(), bCurrentState, aStates);
                        that.oShellModel.addElementToManagedQueue(oControlInstance);
                    }
                    oDeferred.resolve(oControlInstance);
                });
        } else {
            Log.warning("You must specify control type in order to create it");
        }
        return oDeferred.promise();
    };

    /**
     * Creates and displays a sub header control in Fiori launchpad, in the given launchpad states.<br>
     * The new control is displayed in FLP UI according to the given display parameters.<br>
     * If a sub header already exists, the new created one will replace the existing one.<br><br>
     *
     * <b>Example:</b>
     * <pre>
     *   var oRenderer = sap.ushell.Container.getRenderer("fiori2");
     *   oRenderer.addSubHeader("sap.m.Bar", {id: "testBar", contentLeft: [new sap.m.Button({text: "Test SubHeader Button",
     *      press: function () {
     *        sap.m.MessageToast.show("Pressed");
     *      }
     *    })
     *   ]}, true, true);
     * </pre>
     *
     * This function is marked for deprecation as of version 1.48.<br>
     * It will continue to work as expected as long as one of the following conditions apply:<br>
     * 1. The control instance is already created and its ID is included in the input parameter oControlProperties<br>
     * 2. The control type resource is already loaded<br>
     * 3. Synchronous XHR requests are supported by the browser<br>
     *
     * @param {string} controlType
     *   The (class) name of the control type to create.<br>
     *   For example: <code>"sap.m.Bar"</code><br>
     *
     * @param {object} oControlProperties
     *   The properties that will be passed to the created control.<br>
     *   For example: <code>{id: "testBar"}</code><br>
     *
     * @param {boolean} bIsVisible
     *   Specifies whether the sub header control is displayed after being created.<br>
     *   If <code>true</code> then the control is displayed according to parameters bCurrentState and aStates,<br>
     *   if <code>false</code> then the control is created but not displayed.<br>
     *
     * @param {boolean} bCurrentState
     *   If <code>true</code> then the new created control is added to the current rendered shell state.<br>
     *   When the user navigates to another application (including the Home page) then the control will be removed.<br>
     *   If <code>false</code> then add the control to the LaunchPadState itself.<br>
     *
     * @param {String[]} aStates
     *   (Valid only if bCurrentState is <code>false</code>)<br>
     *   A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the control is added.<br>
     *   If no launchpad state is provided the control is added in all states.
     *   @see LaunchpadState.<br>
     *
     * @returns {object} The created control
     *
     * @since 1.30
     *
     * @deprecated since version 1.48 (as a result of XMLHttpRequest spec prohibiting the sending of synchronous requests).
     *   Use <code>addShellSubHeader<code> instead
     *
     * @public
     */
    API.prototype.addSubHeader = function (controlType, oControlProperties, bIsVisible, bCurrentState, aStates) {
        var sControlResource = controlType.replace(/\./g, "/"),
            // Try to require the control in case it is already loaded
            oControlObject = sap.ui.require(sControlResource),
            oControlInstance,
            fnCreate,
            bResourceLoadedAsObject = false;

        // Verify whether the control type is already loaded
        if (oControlObject) {
            bResourceLoadedAsObject = true;
        } else if (!ObjectPath.get(controlType)) {
            // Load the control type synchroniously.
            // Verify (again) that controlType wass not loaded yet.
            // Use-case: if it was loaded using sap.ui.require, but the control itself is not a module,
            // hence, sap.ui.require(sControlResource) that was called before returned "undefined" although the actual resource is already loaded
            jQuery.sap.require(controlType); // TODO: remove jQuery.sap (use "sap.ui.require" instead)
        }

        fnCreate = function (oControlProperties) {
            if (controlType) {
                if (bResourceLoadedAsObject) {
                    return new oControlObject(oControlProperties);
                }
                var oControlPrototype = ObjectPath.get(controlType);
                return new oControlPrototype(oControlProperties);
            }
            Log.warning("You must specify control type in order to create it");
        };

        oControlInstance = this.createItem(oControlProperties, bCurrentState, aStates, fnCreate);
        if (bIsVisible) {
            this.showSubHeader(oControlInstance.getId(), bCurrentState, aStates);
        }
        return oControlInstance;
    };

    /**
     * Creates an Action Button in Fiori launchpad, in the given launchpad states. </br>
     * The button will be displayed in the user actions menu, that is opened from the user button in the shell header.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var oRenderer = sap.ushell.Container.getRenderer("fiori2"),
     *     oAddActionButtonProperties = {
     *        controlType : "sap.m.Button",
     *        oControlProperties : {
     *          id: "mySpecialButton",
     *          text: "Special Button",
     *          icon: "sap-icon://refresh",
     *          press: function () {
     *            alert("My Special Button was pressed!");
     *          }
     *        },
     *        bIsVisible: true,
     *        bCurrentState: true
     *   };
     *   oRenderer.addUserAction(oAddActionButtonProperties);
     * </pre>
     *
     * @param {object} oParameters<br>
     *   Contains the required parameters for creating and showing the new control object:<br>
     *   Properties:<br>
     *   - {string} controlType<br>
     *       The (class) name of the control type to create.<br>
     *   - {object} oControlProperties<br>
     *       The properties that will be passed to the created control.<br>
     *   - {boolean} bIsVisible<br>
     *       Specify whether to display the control.<br>
     *   - {boolean} bCurrentState<br>
     *       If true, add the current control only to the current rendered shell state.<br>
     *       Once the user navigates to another app or back to the Home page, this control will be removed.<br>
     *   - {String[]} aStates<br>
     *       (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.<br>
     *
     *     @see LaunchpadState.
     *     If no launchpad state is provided the content is added in all states.
     *
     * @returns {object} jQuery.deferred.promise object that when resolved, returns the newly created control
     *
     * @since 1.48
     *
     * @public
     */
    API.prototype.addUserAction = function (oParameters) {
        var oDeferred = new jQuery.Deferred(),
            that = this,
            oModelToUpdate = this.oShellModel.getModelToUpdate(),
            sControlResource,
            oControlInstance,
            controlType = oParameters.controlType,
            oControlProperties = oParameters.oControlProperties,
            bIsVisible = oParameters.bIsVisible,
            bCurrentState = oParameters.bCurrentState,
            aStates = oParameters.aStates,
            sNoControlTypeErrorMessage;

        // If a control instance is already created - get it by its id
        if (oControlProperties && oControlProperties.id && sap.ui.getCore().byId(oControlProperties.id)) {
            oControlInstance = sap.ui.getCore().byId(oControlProperties.id);
            if (oControlInstance) {
                oDeferred.resolve(oControlInstance);
            }
        }

        if (controlType) {
            if (controlType === "sap.m.Button") {
                controlType = "sap.ushell.ui.launchpad.ActionItem";
            }
            sControlResource = controlType.replace(/\./g, "/");
            sap.ui.require([sControlResource],
                function (oControlObject) {
                    //change model
                    var oOrigShellModel = that.oShellModel.getModelToUpdate();
                    that.oShellModel.setModelToUpdate(oModelToUpdate, true);
                    var btnId;
                    if (oControlProperties) {
                        //fallback for qunit
                        if (oControlProperties.id) {
                            btnId = oControlProperties.id;
                        }
                    }
                    oControlInstance = sap.ui.getCore().byId(btnId) || new oControlObject(oControlProperties);
                    if (!oControlInstance.getActionType) {
                        oControlInstance = new oControlObject(oControlProperties);
                    }
                    if (bIsVisible) {
                        that.showActionButton(oControlInstance.getId(), bCurrentState, aStates);
                        that.oShellModel.addElementToManagedQueue(oControlInstance);
                    }
                    that.oShellModel.setModelToUpdate(oOrigShellModel, false);
                    oDeferred.resolve(oControlInstance);
                });
        } else {
            sNoControlTypeErrorMessage = "You must specify control type in order to create it";
            Log.warning(sNoControlTypeErrorMessage);
            oDeferred.reject(sNoControlTypeErrorMessage);
        }
        return oDeferred.promise();
    };

    /**
     * Creates an action button in the options bar of the Me Area in the SAP Fiori launchpad, in the given launchpad states (LaunchpadState). </br>
     *
     * <b>Example:</b>
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").addActionButton("sap.m.Button", {id: "testBtn2", text: "test button"}, true, true);
     * </pre>
     *
     * This function is marked for deprecation as of version 1.48.<br>
     * It will continue to work as expected as long as one of the following conditions apply:<br>
     * 1. The control instance is already created and its ID is included in the input parameter oControlProperties<br>
     * 2. The control type resource is already loaded<br>
     * 3. Synchronous XHR requests are supported by the browser<br>
     *
     * @param {string} controlType
     *   The (class) name of the control type to create.
     *
     * @param {object} oControlProperties
     *   The properties that will be passed to the created control.
     *
     * @param {boolean} bIsVisible
     *  Specify whether to display the control. If true, the control is displayed (calls the showActionButton method)
     *  according to the bCurrentState and aStates parameters. If false, the control is created but not displayed (you can use showActionButton to display the control when needed).
     *
     * @param {boolean} bCurrentState
     *   If true, add the current control only to the current rendered shell state.
     *   Once the user navigates to another app or back to the home page, this control will be removed.
     *
     * @param {String[]} aStates
     *   List of the launchpad states (sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which to add the control. Valid only if bCurrentState is set to false.
     *   @see sap.ushell.renderers.fiori2.renderer.LaunchpadState.
     *   If no launchpad state is provided, the content is added in all states.
     *
     * @returns {object} oItem - the created control
     *
     * @since 1.30
     *
     * @deprecated since version 1.48 (as a result of XMLHttpRequest spec prohibiting the sending of synchronous requests).
     * Use <code>addUserAction<code> instead
     *
     * @public
     */
    API.prototype.addActionButton = function (controlType, oControlProperties, bIsVisible, bCurrentState, aStates) {
        var sControlResource,
            oControlObject,
            oControlInstance,
            fnCreate,
            bResourceLoadedAsObject = false;

        if (controlType === "sap.m.Button") {
            controlType = "sap.ushell.ui.launchpad.ActionItem";
        }

        sControlResource = controlType.replace(/\./g, "/");
        // Try to require the control in case it is already loaded
        oControlObject = sap.ui.require(sControlResource);

        // Verify whether the control type is already loaded
        if (oControlObject) {
            bResourceLoadedAsObject = true;
        } else if (!ObjectPath.get(controlType)) {
            // Load the control type synchroniously.
            // Verify (again) that controlType wass not loaded yet.
            // Use-case: if it was loaded using sap.ui.require, but the control itself is not a module,
            // hence, sap.ui.require(sControlResource) that was called before returned "undefined" although the actual resource is already loaded
            jQuery.sap.require(controlType); // TODO: remove jQuery.sap (use "sap.ui.require" instead)
        }

        fnCreate = function (oControlProperties) {
            if (controlType) {
                if (bResourceLoadedAsObject) {
                    return new oControlObject(oControlProperties);
                }
                var oControlPrototype = ObjectPath.get(controlType);
                return new oControlPrototype(oControlProperties);
            }
            Log.warning("You must specify control type in order to create it");
        };

        oControlInstance = this.createItem(oControlProperties, bCurrentState, aStates, fnCreate);
        if (bIsVisible) {
            this.showActionButton(oControlInstance.getId(), bCurrentState, aStates);
        }

        return oControlInstance;
    };

    /**
     * Creates a FloatingActionButton in Fiori launchpad, in the given launchpad states.</br>
     * The FloatingActionButton is rendered in the bottom right corner of the shell.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").addFloatingActionButton("sap.ushell.ui.shell.ShellFloatingAction", {id: "testBtn"}, true, true);
     * </pre>
     *
     * @param {object} oParameters<br>
     *   Contains the required parameters for creating and showing the new control object:<br>
     *   Properties:<br>
     *   - {string} controlType<br>
     *       The (class) name of the control type to create.<br>
     *   - {object} oControlProperties<br>
     *       The properties that will be passed to the created control.<br>
     *   - {boolean} bIsVisible<br>
     *       Specify whether to display the control.<br>
     *   - {boolean} bCurrentState<br>
     *       If true, add the current control only to the current rendered shell state.<br>
     *       Once the user navigates to another app or back to the Home page, this control will be removed.<br>
     *   - {String[]} aStates<br>
     *       (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.<br>
     *
     *     @see LaunchpadState.
     *     If no launchpad state is provided the content is added in all states.
     *
     * @returns {object} jQuery.deferred.promise object that when resolved, returns the newly created control
     *
     * @since 1.48
     *
     * @public
     */
    API.prototype.addFloatingButton = function (oParameters) {
        var oDeferred = new jQuery.Deferred(),
            that = this,
            sControlResource,
            oControlInstance,
            controlType = oParameters.controlType,
            oControlProperties = oParameters.oControlProperties,
            bIsVisible = oParameters.bIsVisible,
            bCurrentState = oParameters.bCurrentState,
            aStates = oParameters.aStates;

        // If a control instance is already created - get it by its id
        if (oControlProperties && oControlProperties.id && sap.ui.getCore().byId(oControlProperties.id)) {
            oControlInstance = sap.ui.getCore().byId(oControlProperties.id);
            if (oControlInstance) {
                if (bIsVisible) {
                    that.oShellModel.addElementToManagedQueue(oControlInstance);
                    that.showFloatingActionButton(oItem.getId(), bCurrentState, aStates);
                }
                oDeferred.resolve(oControlInstance);
            }
        }

        if (controlType) {
            sControlResource = controlType.replace(/\./g, "/");
        } else {
            sControlResource = "sap/m/Button";
        }

        sap.ui.require([sControlResource],
            function (oControlObject) {
                oControlInstance = new oControlObject(oControlProperties);
                if (bIsVisible) {
                    this.showFloatingActionButton(oItem.getId(), bCurrentState, aStates);
                }
                oDeferred.resolve(oControlInstance);
            });
        return oDeferred.promise();
    };

    /**
     * Creates a FloatingActionButton in Fiori launchpad, in the given launchpad states.</br>
     * The FloatingActionButton is rendered in the bottom right corner of the shell.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").addFloatingActionButton("sap.ushell.ui.shell.ShellFloatingAction", {id: "testBtn"}, true, true);
     * </pre>
     *
     * This function is marked for deprecation as of version 1.48.<br>
     * It will continue to work as expected as long as one of the following conditions apply:<br>
     * 1. The control instance is already created and its ID is included in the input parameter oControlProperties<br>
     * 2. The control type resource is already loaded<br>
     * 3. Synchronous XHR requests are supported by the browser<br>
     *
     * @param {string} controlType
     *   The (class) name of the control type to create.
     *
     * @param {object} oControlProperties
     *   The properties that will be passed to the created control.
     *
     * @param {boolean} bIsVisible
     *   Specify whether to display the control.
     *
     * @param {boolean} bCurrentState
     *   If true, add the current control only to the current rendered shell state.
     *   Once the user navigates to another app or back to the Home page, this control will be removed.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is added in all states.
     *
     * @returns {object} oItem - the created control
     *
     * @since 1.30
     *
     * @deprecated since version 1.48 (as a result of XMLHttpRequest spec prohibiting the sending of synchronous requests).
     * Use <code>addFloatingButton<code> instead
     *
     * @public
     */
    API.prototype.addFloatingActionButton = function (controlType, oControlProperties, bIsVisible, bCurrentState, aStates) {
        var sControlResource,
            oControlObject,
            oControlInstance,
            fnCreate,
            bResourceLoadedAsObject = false;

        if (!controlType) {
            controlType = "sap.m.Button";
        }

        sControlResource = controlType.replace(/\./g, "/");
        // Try to require the control in case it is already loaded
        oControlObject = sap.ui.require(sControlResource);

        // Verify whether the control type is already loaded
        if (oControlObject) {
            bResourceLoadedAsObject = true;
        } else if (!ObjectPath.get(controlType)) {
            // Load the control type synchroniously.
            // Verify (again) that controlType wass not loaded yet.
            // Use-case: if it was loaded using sap.ui.require, but the control itself is not a module,
            // hence, sap.ui.require(sControlResource) that was called before returned "undefined" although the actual resource is already loaded
            jQuery.sap.require(controlType); // TODO: remove jQuery.sap (use "sap.ui.require" instead)
        }

        fnCreate = function (oControlProperties) {
            if (controlType) {
                if (bResourceLoadedAsObject) {
                    return new oControlObject(oControlProperties);
                }
                var oControlPrototype = ObjectPath.get(controlType);
                return new oControlPrototype(oControlProperties);
            }
            Log.warning("You must specify control type in order to create it");
        };

        oControlInstance = this.createItem(oControlProperties, bCurrentState, aStates, fnCreate);
        if (bIsVisible) {
            this.showFloatingActionButton(oControlInstance.getId(), bCurrentState, aStates);
        }

        return oControlInstance;
    };

    /**
     * Creates the Left Pane content in Fiori launchpad, in the given launchpad states.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   var oRenderer = sap.ushell.Container.getRenderer("fiori2"),
     *     oLeftPaneContentProperties = {
     *       controlType : "sap.m.Button",
     *       oControlProperties : {
     *         id: "testBtn",
     *         text: "Test Button"
     *       },
     *       true,
     *       true
     *     };
     *   oRenderer.addSidePaneContent(oLeftPaneContentProperties);
     * </pre>
     *
     * @param {object} oParameters<br>
     *  Contains the parameters that are required for creating and showing the new control object:<br>
     *  Properties:<br>
     *   - {string} controlType<br>
     *       The (class) name of the control type to create.<br>
     *   - {object} oControlProperties<br>
     *       The properties that will be passed to the created control.<br>
     *   - {boolean} bIsVisible<br>
     *       Specify whether to display the control.<br>
     *   - {boolean} bCurrentState<br>
     *       If true, add the current control only to the current rendered shell state.<br>
     *       Once the user navigates to another app or back to the Home page, this control will be removed.<br>
     *   - {String[]} aStates<br>
     *       (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.<br>
     *
     *     @see LaunchpadState.
     *     If no launchpad state is provided the content is added in all states.
     *
     * @returns {object} jQuery.deferred.promise object that when resolved, returns the newly created control
     *
     * @since 1.48
     *
     * @public
     */
    API.prototype.addSidePaneContent = function (oParameters) {
        var oDeferred = new jQuery.Deferred(),
            that = this,
            sControlResource,
            oControlInstance,
            controlType = oParameters.controlType,
            oControlProperties = oParameters.oControlProperties,
            bIsVisible = oParameters.bIsVisible,
            bCurrentState = oParameters.bCurrentState,
            aStates = oParameters.aStates;

        // If a control instance is already created - get it by its id
        if (oControlProperties && oControlProperties.id && sap.ui.getCore().byId(oControlProperties.id)) {
            oControlInstance = sap.ui.getCore().byId(oControlProperties.id);
            if (oControlInstance) {
                oDeferred.resolve(oControlInstance);
            }
        }

        if (controlType) {
            sControlResource = controlType.replace(/\./g, "/");
            sap.ui.require([sControlResource],
                function (oControlObject) {
                    oControlInstance = new oControlObject(oControlProperties);
                    if (bIsVisible) {
                        that.oShellModel.addElementToManagedQueue(oControlInstance);
                        that.showLeftPaneContent(oItem.getId(), bCurrentState, aStates);
                    }
                    oDeferred.resolve(oControlInstance);
                });
        } else {
            Log.warning("You must specify control type in order to create it");
        }
        return oDeferred.promise();
    };

    /**
     * Creates the Left Pane content in Fiori launchpad, in the given launchpad states.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").addLeftPaneContent("sap.m.Button", {id: "testBtn", text: "Test Button"}, true, true);
     * </pre>
     *
     * This function is marked for deprecation as of version 1.48.<br>
     * It will continue to work as expected as long as one of the following conditions apply:<br>
     * 1. The control instance is already created and its ID is included in the input parameter oControlProperties<br>
     * 2. The control type resource is already loaded<br>
     * 3. Synchronous XHR requests are supported by the browser<br>
     *
     * @param {string} controlType
     *   The (class) name of the control type to create.
     *
     * @param {object} oControlProperties
     *   The properties that will be passed to the created control.
     *
     * @param {boolean} bIsVisible
     *   Specify whether to display the control.
     *
     * @param {boolean} bCurrentState
     *   If true, add the current control only to the current rendered shell state.
     *   Once the user navigates to another app or back to the Home page, this control will be removed.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is added in all states.
     *
     * @returns {object} oItem - the created control
     *
     * @since 1.30
     *
     * @deprecated since version 1.48 (as a result of XMLHttpRequest spec prohibiting the sending of synchronous requests).
     * Use <code>addSidePaneContent<code> instead
     *
     * @public
     */
    API.prototype.addLeftPaneContent = function (controlType, oControlProperties, bIsVisible, bCurrentState, aStates) {
        var sControlResource = controlType.replace(/\./g, "/"),
            // Try to require the control in case it is already loaded
            oControlObject = sap.ui.require(sControlResource),
            oControlInstance,
            fnCreate,
            bResourceLoadedAsObject;

        // Verify whether the control type is already loaded
        if (oControlObject) {
            bResourceLoadedAsObject = true;
        } else if (!ObjectPath.get(controlType)) {
            // Load the control type synchroniously.
            // Verify (again) that controlType wass not loaded yet.
            // Use-case: if it was loaded using sap.ui.require, but the control itself is not a module,
            // hence, sap.ui.require(sControlResource) that was called before returned "undefined" although the actual resource is already loaded
            jQuery.sap.require(controlType); // TODO: remove jQuery.sap (use "sap.ui.require" instead)
        }

        fnCreate = function (oControlProperties) {
            if (controlType) {
                if (bResourceLoadedAsObject) {
                    return new oControlObject(oControlProperties);
                }
                var oControlPrototype = ObjectPath.get(controlType);
                return new oControlPrototype(oControlProperties);

            }
            Log.warning("You must specify control type in order to create it");
        };

        oControlInstance = this.createItem(oControlProperties, bCurrentState, aStates, fnCreate);
        if (bIsVisible) {
            this.showLeftPaneContent(oControlInstance.getId(), bCurrentState, aStates);
        }

        return oControlInstance;
    };

    /**
     * Creates and displays an item in the header of Fiori launchpad, in the given launchpad states.<br>
     * The new header item will be displayed on the left-hand side of the Fiori Launchpad shell header, according to the given display parameters.<br>
     * The new header item will be added to the right of any existing header items. The header can contain a maximum of three header items.<br><br>
     *
     * <b>Example:</b>
     * <pre>
     *   var oRenderer = sap.ushell.Container.getRenderer("fiori2");
     *   oRenderer.addHeaderItem("sap.ushell.ui.shell.ShellHeadItem", {id: "testBtn"}, true, true);
     * </pre>
     *
     * @param {string} [controlType]
     *   The (class) name of the control type to create.
     *   For example: <code>"sap.m.Button"</code><br>
     *   <b>Deprecated</b>: Since version 1.38.
     *   This property is no longer supported.
     *
     * @param {object} oControlProperties
     *   The properties that will be passed to the created control.
     *   For example: <code>{id: "testButton"}</code><br>
     *
     * @param {boolean} bIsVisible
     *   Specifies whether the header item control is displayed after being created.<br>
     *   If <code>true</code> then the control is displayed according to parameters bCurrentState and aStates.<br>
     *   If <code>false</code> then the control is created but not displayed.<br>
     *
     * @param {boolean} bCurrentState
     *   If <code>true</code> then the new created control is added to the current rendered shell state.<br>
     *   When the user navigates to a different state including a different application then the control will be removed.<br>
     *   If <code>false</code> then add the control to the LaunchPadState itself.<br>
     *
     * @param {String[]} aStates
     *   (Valid only if bCurrentState is <code>false</code>)<br>
     *   A list of shell states (i.e. sap.ushell.renderers.fiori2.Renderer.LaunchpadState) in which the control is added.<br>
     *   If no launchpad state is provided the control is added in all states.
     *   @see LaunchpadState.<br>
     *
     * @returns {object} The created control
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.addHeaderItem = function (controlType, oControlProperties, bIsVisible, bCurrentState, aStates) {
        //in order to support deprecation of the never used argument: 'controlType' , we'll need to check whether it was passed to the function by
        //checking the typs of the first two arguments
        if (typeof (arguments[0]) === "object" && typeof (arguments[1]) === "boolean") {
            oControlProperties = arguments[0];
            bIsVisible = arguments[1];
            bCurrentState = arguments[2];
            aStates = arguments[3];
        } else {
            Log.warning("sap.ushell.renderers.fiori2.Renderer: The parameter 'controlType' of the function 'addHeaderItem' is deprecated. Usage will be ignored!");
        }
        var oProperties = oControlProperties;
        //in case Fiori2 is on we need to set the showSeparator flag to false
        oProperties.showSeparator = false;
        var fnCreate = function (oControlProperties) {
            return new ShellHeadItem(oControlProperties);
        },
            oItem = this.createItem(oProperties, bCurrentState, aStates, fnCreate);

        if (bIsVisible) {
            this.showHeaderItem(oItem.getId(), bCurrentState, aStates);
        }

        return oItem;
    };

    /**
     * Creates a RightFloatingContainerItem  in Fiori Launchpad and adds it to the Tool Area, in the given launchpad states.</br>
     * If no items are added to the Tool Area, it will not be displayed.</br>
     * Once an item is added, the Tool Area is rendered on the left side on the Fiori Launchpad shell.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").addRightFloatingContainerItem({
     *     id: 'testButton',
     *     icon: "sap-icon://documents",
     *     press: function (evt) {
     *       window.alert('Press' );
     *     },
     *     expand: function (evt) {
     *       window.alert('Expand' );
     *     }
     *   }, true, false, ["home"]);
     * </pre>
     *
     * @param {object} oControlProperties
     *   The properties object that will be passed to the constructor of sap.ushell.ui.shell.RightFloatingContainerItem control.
     *   @see sap.ushell.ui.shell.RightFloatingContainerItem
     *
     * @param {boolean} bIsVisible
     *   Specify whether to display the control.
     *
     * @param {boolean} bCurrentState
     *   If true, add the current control only to the current rendered shell state.
     *
     * @param {String[]} aStates
     *   List of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.Only valid if bCurrentState is set to false.
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is added in all states.
     *
     * @returns {object} oItem - the created control
     *
     * @since 1.30
     *
     * @private
     */
    API.prototype.addRightFloatingContainerItem = function (oControlProperties, bIsVisible, bCurrentState, aStates) {
        var fnCreate = function (oControlProperties) {
            return new NotificationListItem(oControlProperties);
        },
            oItem = this.createItem(oControlProperties, bCurrentState, aStates, fnCreate);

        if (bIsVisible) {
            this.showRightFloatingContainerItem(oItem.getId(), bCurrentState, aStates);
        }

        return oItem;
    };

    /**
     * Creates a ToolAreaItem  in Fiori Launchpad and adds it to the Tool Area, in the given launchpad states.</br>
     * If no items are added to the Tool Area, it will not be displayed.</br>
     * Once an item is added, the Tool Area is rendered on the left side on the Fiori Launchpad shell.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").addToolAreaItem({
     *     id: "testButton",
     *     icon: "sap-icon://documents",
     *     expandable: true,
     *     press: function (evt) {
     *       window.alert("Press" );
     *     },
     *     expand: function (evt) {
     *       // This function will be called on the press event of the "expand" button. The result of "expand" event in the UI must be determined by the developer
     *       window.alert("Expand" );
     *     }
     *   }, true, false, ["home"]);
     * </pre>
     *
     * @param {object} oControlProperties
     *   The properties object that will be passed to the constructor of sap.ushell.ui.shell.ToolAreaItem control.
     *   @see sap.ushell.ui.shell.ToolAreaItem
     *
     * @param {boolean} bIsVisible
     *   Specify whether to display the control.
     *
     * @param {boolean} bCurrentState
     *   If true, add the current control only to the current rendered shell state.
     *
     * @param {String[]} aStates
     *   List of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.Only valid if bCurrentState is set to false.
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is added in all states.
     *
     * @returns {object} oItem - the created control
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.addToolAreaItem = function (oControlProperties, bIsVisible, bCurrentState, aStates) {
        var fnCreate = function (oControlProperties) {
            return new ToolAreaItem(oControlProperties);
        },
            oItem = this.createItem(oControlProperties, bCurrentState, aStates, fnCreate);

        if (bIsVisible) {
            this.showToolAreaItem(oItem.getId(), bCurrentState, aStates);
        }

        return oItem;
    };

    /**
     * Creates and displays one or more HeaderItem controls in Fiori launchpad, in the given launchpad states.</br>
     * The HeaderItem will be displayed in the right side of the Fiori Launchpad shell header.</br>
     *
     * <b>Example:</b>
     * <pre>
     *   sap.ushell.Container.getRenderer("fiori2").addHeaderEndItem("sap.ushell.ui.shell.ShellHeadItem", {id: "testBtn"}, true, true);
     * </pre>
     *
     * @param {string} controlType
     *   The (class) name of the control type to create. Currently only "sap.ushell.ui.shell.ShellHeadItem" control type is supported.
     *
     * @param {object} oControlProperties
     *   The properties that will be passed to the created control.
     *
     * @param {boolean} bIsVisible
     *   Specify whether to display the control.
     *
     * @param {boolean} bCurrentState
     *   If true, add the current control only to the current rendered shell state.
     *   Once the user navigates to another app or back to the Home page, this control will be removed.
     *
     * @param {String[]} aStates
     *   (only valid if bCurrentState is set to false) - list of the sap.ushell.renderers.fiori2.Renderer.LaunchpadState in which to add the control.
     *   @see LaunchpadState.
     *   If no launchpad state is provided the content is added in all states.
     *
     * @returns {object} oItem - the created control
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.addHeaderEndItem = function (controlType, oControlProperties, bIsVisible, bCurrentState, aStates) {
        var oProperties = oControlProperties;
        //in case Fiori2 is on we need to set the showSeparator flag to false
        oProperties.showSeparator = false;
        var fnCreate = function (oControlProperties) {
            return new ShellHeadItem(oControlProperties);
        },
            oItem = this.createItem(oProperties, bCurrentState, aStates, fnCreate);

        if (bIsVisible) {
            this.showHeaderEndItem(oItem.getId(), bCurrentState, aStates);
        }

        return oItem;
    };

    /**
     * Sets the visibility of the left pane in the Fiori Launchpad shell, in the given launchpad state
     * @see LaunchpadState.
     *
     * @param {string} sLaunchpadState
     *   LaunchpadState in which to show/hide the left pane
     * @param {boolean} bVisible
     *   specif whether to display the left pane or not
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.setLeftPaneVisibility = function (sLaunchpadState, bVisible) {
        this.oShellModel.setLeftPaneVisibility(bVisible, false, [sLaunchpadState]);
    };

    /**
     * Sets the ToolArea visibility
     *
     * @param {String} [sLaunchpadState] - LaunchpadState in which to show/hide the ToolArea
     *
     * @see LaunchpadState
     *
     * @param {boolean} [bVisible] - specifies whether to display the ToolArea or not
     *
     * @public
     */
    API.prototype.showToolArea = function (sLaunchpadState, bVisible) {
        this.oShellModel.showShellItem("/toolAreaVisible", sLaunchpadState, bVisible);
    };

    API.prototype.setHeaderHiding = function (bHiding) {
        return this.oShellModel.setHeaderHiding(bHiding);
    };

    /*---------------States------------------------*/

    /**
     * The launchpad states that can be passed as a parameter.</br>
     * <b>Values:<b>
     * App - launchpad state when running a Fiori app</br>
     * Home - launchpad state when the home page is open</br>
     *
     * @since 1.30
     *
     * @public
     */
    API.prototype.LaunchpadState = {
        App: "app",
        Home: "home"
    };

    /*---------------Conditional----------------*/

    API.prototype.createInspection = function (sAttibute, aCheckPoint, bCurrentState, aStates) {
        this.oShellModel.createInspection(sAttibute, aCheckPoint, bCurrentState, aStates);
    };

    API.prototype.createTriggers = function (aTriggers, bCurrentState, aStates) {
        this.oShellModel.createTriggers(aTriggers, bCurrentState, aStates);
    };

    /*---------------Generic--------------------*/

    API.prototype.convertButtonsToActions = function (aIds, bCurrentState, aStates) {
        var oProperties = {},
            oButton,
            that = this;
        aIds.forEach(function (sId) {
            oButton = sap.ui.getCore().byId(sId);
            oProperties.id = oButton.getId();
            oProperties.text = oButton.getText();
            oProperties.icon = oButton.getIcon();
            oProperties.tooltip = oButton.getTooltip();
            oProperties.enabled = oButton.getEnabled();
            oProperties.visible = oButton.getVisible();
            if (oButton.mEventRegistry && oButton.mEventRegistry.press) {
                oProperties.press = oButton.mEventRegistry.press[0].fFunction;
            }
            oButton.destroy();
            that.addActionButton("sap.ushell.ui.launchpad.ActionItem", oProperties, oProperties.visible, bCurrentState, aStates);
        });
    };

    API.prototype.createItem = function (oControlProperties, bCurrentState, aStates, fnCreateItem) {
        //create the object
        var oItem;
        if (oControlProperties && oControlProperties.id) {
            oItem = sap.ui.getCore().byId(oControlProperties.id);
        }
        if (!oItem) {
            oItem = fnCreateItem(oControlProperties);
            if (bCurrentState) {
                this.oShellModel.addElementToManagedQueue(oItem);
            }
        }

        return oItem;
    };

    /*------------Custom State Entry------------------------------*/

    API.prototype.addEntryInShellStates = function (sName, entrySuffix, fnAdd, fnRemove, oStateConfiguration) {
        this.oShellModel.addEntryInShellStates(sName, entrySuffix, fnAdd, fnRemove, oStateConfiguration);
    };

    API.prototype.removeCustomItems = function (sStateEntry, aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.removeCustomItems(sStateEntry, [aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.removeCustomItems(sStateEntry, aIds, bCurrentState, aStates);
        }
    };

    API.prototype.addCustomItems = function (sStateEntry, aIds, bCurrentState, aStates) {
        if (typeof aIds === "string") {
            this.oShellModel.addCustomItems(sStateEntry, [aIds], bCurrentState, aStates);
        } else {
            this.oShellModel.addCustomItems(sStateEntry, aIds, bCurrentState, aStates);
        }
    };

    return API;
});
