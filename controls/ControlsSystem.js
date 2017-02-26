
var DECS = require('decs');
var keymaster = require('keymaster');

var ControlsSystem = DECS.createSystemClass(
	function() {
		this.activeControls = null;
		this.target = null;
	},
	{
		tick: function(ms) {
			if (
				this.activeControls &&
				this.target &&
				this.activeControls.controls &&
				this.target.controls
			) {
				var scale = ms / 1000;
				var targetProfiles  = this._getProfiles(this.target.controls);
				var profiles = this._getProfiles(this.activeControls.controls);
				var activeProfiles = this._tickProfile(this.activeControls.controls, scale);
				profiles.forEach(function(sourceProfile) {
					targetProfiles.forEach(function(targetProfile) {
						if (targetProfile.name === sourceProfile.name) {
							this._applyProfileToProfile(
								targetProfile,
								sourceProfile,
								activeProfiles.includes(sourceProfile),
								scale
							);
						}
					}.bind(this));
				}.bind(this));
			}
		},
		setTarget: function(entity) {
			this.target = entity;
		},
		activateControls: function(controls) {
			this.activeControls = controls;
		},
		_tickProfile: function(profile, scale) {
			var profiles = this._getProfiles(profile);
			var activeProfiles = this._getActiveProfiles(profile);
			profiles.forEach(function(subProfile) {
				this._tickProfile(subProfile, scale);
				this._applyProfileToProfile(
					profile,
					subProfile,
					activeProfiles.includes(subProfile),
					scale
				);
			}.bind(this));
			return activeProfiles;
		},
		_applyProfileToProfile: function(targetProfile, sourceProfile, isActive, scale) {
			if (
				!isActive &&
				sourceProfile.name === targetProfile.name &&
				sourceProfile.name === 'throttleChoke' &&
				targetProfile.value === 1
			) {
				debugger;
			}
			if (isActive) {
				this._applyActiveProfileToProfile(targetProfile, sourceProfile, scale);
			} else {
				this._applyInactiveProfileToProfile(targetProfile, sourceProfile, scale);
			}
		},
		_applyActiveProfileToProfile: function(targetProfile, sourceProfile, scale) {
			var value = targetProfile.value || 0;
			switch(targetProfile.inputMethod) {
				case 'add':
					value += sourceProfile.value * scale || 0;
				break;
				case 'toggle':
					value = (
						sourceProfile.value || sourceProfile.value === 0 ? 
						sourceProfile.value :
						1
					);
				break;
				case 'set':
				default:
					value = sourceProfile.value;
				break;
			}
			this._setProfileValue(targetProfile, value);
		},
		_applyInactiveProfileToProfile: function(targetProfile, sourceProfile, scale) {
			var value = targetProfile.value || 0;
			switch(targetProfile.inputMethod) {
				case 'toggle':
					value = targetProfile.defaultValue || 0;
				break;
			}
			this._setProfileValue(targetProfile, value);
		},
		_setProfileValue: function(profile, value) {
			var max = profile.max || profile.max === 0 ? profile.max : Infinity;
			var min = profile.min || profile.min === 0 ? profile.min : -Infinity;
			profile.value = Math.min(
				max,
				Math.max(
					min,
					value
				)
			);
		},
		_getProfiles: function(profile) {
			if (profile.input) {
				return Object.keys(profile.input).map(function(key) {
					return profile.input[key];
				});
			}
			return [];
		},
		_getActiveProfiles: function(topProfile) {
			var profiles = this._getProfiles(topProfile);
			return profiles.filter(function(profile) {
				if (this._checkProfileKeypress(profile)) {
					return true;
				}
				var subProfiles = this._getActiveProfiles(profile);
				if (subProfiles.length > 0) {
					return true;
				}
				return false;
			}.bind(this));
		},
		_checkProfileKeypress: function(input) {
			if (input.keys) {
				return Object.keys(input.keys).find(function(key) {
					return keymaster.isPressed(input.keys[key]);
				});
			}
			return false;
		}
	}
);

module.exports = ControlsSystem;
