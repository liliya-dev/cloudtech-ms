interface ValidateProps {
  length?: number;
  max?: number;
  maxWarning?: string;
  min?: number;
  minWarning?: string;
  required?: boolean;
  unique?: boolean;
}

export function validate({
  length,
  max,
  maxWarning,
  min,
  minWarning,
  required,
  unique,
}: ValidateProps) {
  return (Rule) => {
    const rules = [];
    isDefined(required) && rules.push(Rule.required().error());
    isDefined(min) && rules.push(Rule.min(min).error());
    isDefined(max) && rules.push(Rule.max(max).error());
    isDefined(length) && rules.push(Rule.length(length).error());
    isDefined(unique) && rules.push(Rule.unique().error());
    isDefined(minWarning) && rules.push(Rule.min(minWarning).warning());
    isDefined(maxWarning) && rules.push(Rule.max(maxWarning).warning());
    return rules;
  };

  function isDefined(field) {
    return typeof field !== 'undefined'; // To prevent it being false on false or null
  }
}
